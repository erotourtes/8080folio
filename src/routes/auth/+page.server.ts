import adminApp from '$lib/server/firebase/firebase.admin.app';
import { error, redirect } from '@sveltejs/kit';
import { JWT_EXPIRES_IN, FORM_TOKEN_NAME, COOKIE_SESSION_NAME } from './constants';

export const actions = {
  signIn: async ({ request, cookies }) => {
    const data = await request.formData();
    const token = data.get(FORM_TOKEN_NAME)?.toString();
    if (!token || token.length === 0) throw redirect(303, '/auth');

    const session = await adminApp
      .auth()
      .createSessionCookie(token.toString(), { expiresIn: JWT_EXPIRES_IN })
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
