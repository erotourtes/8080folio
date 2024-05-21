import adminApp, { usersRef } from '$lib/server/firebase/firebase.admin.app';
import { error, redirect } from '@sveltejs/kit';
import {
  JWT_EXPIRES_IN,
  FORM_ACCESS_TOKEN_NAME,
  COOKIE_SESSION_NAME,
  FORM_JWT_TOKEN_NAME,
} from './constants';
import type { TGithubUser } from '$lib/types/types';

export const actions = {
  signIn: async ({ request, cookies }) => {
    const data = await request.formData();
    const jwtToken = data.get(FORM_JWT_TOKEN_NAME)?.toString();
    const accessToken = data.get(FORM_ACCESS_TOKEN_NAME)?.toString();
    if (!jwtToken || !accessToken) throw redirect(303, '/auth');

    const session = await adminApp
      .auth()
      .createSessionCookie(jwtToken.toString(), { expiresIn: JWT_EXPIRES_IN })
      .catch((err) => {
        console.error(err);
        return null;
      });
    if (!session) throw error(500, "Can't login a user");
    cookies.set(COOKIE_SESSION_NAME, session, {
      maxAge: JWT_EXPIRES_IN,
      path: '/',
    });

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
