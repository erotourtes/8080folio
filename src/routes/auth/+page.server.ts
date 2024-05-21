import adminApp, { reposRef, usersRef } from '$lib/server/firebase/firebase.admin.app';
import { error, redirect } from '@sveltejs/kit';
import { FORM_ACCESS_TOKEN_NAME, FORM_JWT_TOKEN_NAME } from './constants';
import type { TFirebaseRepo, TFirebaseUser, TGithubRepo, TGithubUser } from '$lib/types/types';

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

  const githubData: TGithubUser | null = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return null;
    });

  if (!githubData) throw error(500, 'Can not get github data');

  const { bio, blog, public_repos, total_private_repos, repos_url } = githubData;
  const firebaseUser: TFirebaseUser = {
    bio,
    blog,
    public_repos,
    total_private_repos,
    repos_url,
  };
  await curUserRef.set(firebaseUser);

  const githubRepos: TGithubRepo[] | null = await fetch(repos_url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return null;
    });

  if (!githubRepos) throw error(500, 'Can not get github repos');

  const repos: TFirebaseRepo[] = githubRepos.map((repo) => {
    const { languages_url, collaborators_url, stargazers_count, created_at, html_url } = repo;
    return {
      html_url,
      languages_url,
      collaborators_url,
      stargazers_count,
      created_at,
    };
  });

  await reposRef.add({
    userId: user.uid,
    repos,
  });
};
