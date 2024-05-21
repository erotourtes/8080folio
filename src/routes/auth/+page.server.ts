import adminApp, { dbRef, test } from '$lib/server/firebase/firebase.admin.app';
import { error, redirect } from '@sveltejs/kit';
import {
  JWT_EXPIRES_IN,
  FORM_ACCESS_TOKEN_NAME,
  COOKIE_SESSION_NAME,
  FORM_JWT_TOKEN_NAME,
} from './constants';
import type { TGithubUser } from '$lib/types/types';

const updateUserData = async (jwtToken: string) => {
  const user = await adminApp.auth().verifyIdToken(jwtToken);
  return;
  // const exists = await dbRef.get().then((snapshot) => {
  //   if (!snapshot.exists()) return void console.log('NOT EXIST');
  //   snapshot.forEach((doc) => {
  //     console.log(doc.val());
  //   });
  // });
  // if (exists) return;

  // const githubData: TGithubUser | null = await fetch('https://api.github.com/user', {
  //   headers: { Authorization: `Bearer ${user.accessToken}` },
  // })
  //   .then((res) => res.json())
  //   .catch((err) => {
  //     console.error(err);
  //     return null;
  //   });

  // if (!githubData) throw error(500, 'Can not get github data');

  // adminApp
  //   .database()
  //   .ref('users')
  //   .set({
  //     [user.uid]: {
  //       bio: githubData.bio,
  //       blog: githubData.blog,
  //       company: githubData.company,
  //       repositories: githubData.public_repos,
  //       privateRepositories: githubData.total_private_repos,
  //     },
  //   });
};

export const actions = {
  signIn: async ({ request, cookies }) => {
    const data = await request.formData();
    const jwtToken = data.get(FORM_JWT_TOKEN_NAME)?.toString();
    const accessToken = data.get(FORM_ACCESS_TOKEN_NAME)?.toString();
    if (!jwtToken || !accessToken) throw redirect(303, '/auth');

    await updateUserData(jwtToken);

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
    throw redirect(303, '/');
  },
};
