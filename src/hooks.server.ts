import type { Handle } from '@sveltejs/kit';
import type { DecodedIdToken } from 'firebase-admin/auth';
import adminApp from '$lib/server/firebase/firebase.admin.app';
import { COOKIE_SESSION_NAME } from './routes/auth/constants';
import { building } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
  if (building) {
    event.cookies.delete(COOKIE_SESSION_NAME, { path: '/' });
    return await resolve(event);
  }

  const token = event.cookies.get(COOKIE_SESSION_NAME) || '';
  const decodedToken: DecodedIdToken | null = await adminApp
    .auth()
    .verifyIdToken(token)
    .catch(() => {
      console.error("Coudn't validate token: ", token);
      return null;
    });

  event.locals.user = decodedToken;

  return await resolve(event);
};
