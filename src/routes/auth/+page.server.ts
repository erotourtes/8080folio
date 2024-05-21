import adminApp, { usersRef } from '$lib/server/firebase/firebase.admin.app';
import { error, redirect } from '@sveltejs/kit';
import { FORM_ACCESS_TOKEN_NAME, FORM_JWT_TOKEN_NAME } from './constants';
import type { TGithubUser } from '$lib/types/types';

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
  const githubData: TGithubUser | null = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return null;
    });

  if (!githubData) throw error(500, 'Can not get github data');

  const user = await adminApp
    .auth()
    .verifyIdToken(jwtToken)
    .catch(() => null);

  if (!user) throw error(500, 'Can not verify your identity');

  const ref = usersRef.doc(user.uid);
  const doc = await ref.get();
  if (doc.exists) return;

  const { bio, blog, public_repos, total_private_repos, repos_url } = githubData;
  await ref.set({
    bio,
    blog,
    public_repos,
    total_private_repos,
    repos_url,
  });
};
