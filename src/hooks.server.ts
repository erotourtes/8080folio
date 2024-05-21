import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { COOKIE_SESSION_NAME } from './routes/auth/constants';
import type { DecodedIdToken } from 'firebase-admin/auth';
import adminApp from '$lib/server/firebase/firebase.admin.app';

export const handle: Handle = async ({ event, resolve }) => {
  if (building) {
    event.cookies.delete(COOKIE_SESSION_NAME, { path: '/' });
    return await resolve(event);
  }

  const token = event.cookies.get(COOKIE_SESSION_NAME) || '';
  const decodedToken: DecodedIdToken | null = await adminApp
    .auth()
    .verifySessionCookie(token)
    .catch((error) => {
      console.error(error);
      return null;
    });

  event.locals.user = decodedToken;

  return await resolve(event);
};
