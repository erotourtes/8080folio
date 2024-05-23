import adminApp, { reposRef, usersRef } from '$lib/server/firebase/firebase.admin.app';
import { error, redirect } from '@sveltejs/kit';
import { FORM_ACCESS_TOKEN_NAME, FORM_JWT_TOKEN_NAME } from './constants';
import type {
  TFirebaseRepo,
  TFirebaseUser,
  TGithubLanguage,
  TFirebaseContributor,
} from '$lib/types/types';
import { Octokit } from '@octokit/rest';

export const actions = {
  signIn: async ({ request }) => {
    const data = await request.formData();
    const jwtToken = data.get(FORM_JWT_TOKEN_NAME)?.toString();
    const accessToken = data.get(FORM_ACCESS_TOKEN_NAME)?.toString();
    if (!jwtToken || !accessToken) throw redirect(303, '/auth');

    await updateUserData({ accessToken, jwtToken });

    throw redirect(303, '/');
  },
};

const updateUserData = async ({
  accessToken,
  jwtToken,
}: {
  accessToken: string;
  jwtToken: string;
}) => {
  const user = await adminApp
    .auth()
    .verifyIdToken(jwtToken)
    .catch(() => null);
  if (!user) throw error(500, 'Can not verify your identity');

  const curUserRef = usersRef.doc(user.uid);
  const doc = await curUserRef.get();
  if (doc.exists) return;

  const octokit = new Octokit({ auth: accessToken });

  const githubData = await octokit.users.getAuthenticated().catch(handleOcktokitError);
  if (!githubData) throw error(500, 'Can not get github data');

  const {
    bio,
    blog,
    public_repos,
    total_private_repos,
    repos_url,
    login,
    name,
    created_at,
    html_url,
  } = githubData.data;
  const firebaseUser: TFirebaseUser = {
    bio,
    blog,
    username: login,
    created_at,
    name,
    public_repos,
    total_private_repos,
    html_url,
    repos_url,
  };
  await curUserRef.set(firebaseUser);

  const githubRepos = await octokit.repos.listForAuthenticatedUser().catch(handleOcktokitError);
  if (!githubRepos) throw error(500, 'Can not get github repos');

  const githubLanguages: { [key: string]: TGithubLanguage | null } = {};
  await Promise.all(
    githubRepos.data.map(async (repo) => {
      const language = await octokit.repos
        .listLanguages({
          owner: repo.owner.login,
          repo: repo.name,
        })
        .catch(handleOcktokitError);
      if (!language) return;
      githubLanguages[repo.languages_url] = language.data;
    }),
  );

  const githubContributors: { [key: string]: TFirebaseContributor[] } = {};
  for (const repo of githubRepos.data) {
    const contributors = await octokit.repos
      .listContributors({
        owner: repo.owner.login,
        repo: repo.name,
      })
      .catch(handleOcktokitError);
    if (!contributors) continue;
    githubContributors[repo.url] = contributors.data.map((contributor) => {
      return {
        contributions: contributor.contributions,
        html_url: contributor.html_url || null,
        login: contributor.login || null,
        avatar_url: contributor.avatar_url || null,
      };
    });
  }

  const repos: TFirebaseRepo[] = githubRepos.data.map((repo) => {
    const { stargazers_count, created_at, html_url, forks_count, language } = repo;
    return {
      html_url,
      contributors: githubContributors[repo.url],
      languages: githubLanguages[repo.languages_url] || null,
      stargazers_count,
      created_at,
      forks_count,
      language,
    };
  });

  const curUserResposRef = reposRef.doc(user.uid);
  curUserResposRef.set({ userId: user.uid, repos });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleOcktokitError = (error: any) => {
  console.error(error.status);
  return null;
};
