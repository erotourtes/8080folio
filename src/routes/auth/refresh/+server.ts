import { json } from '@sveltejs/kit';
import { COOKIE_SESSION_NAME } from '../constants.js';

export const POST = async (event) => {
  const res = await event.request.json();
  const token = res[COOKIE_SESSION_NAME];

  if (token) event.cookies.set(COOKIE_SESSION_NAME, token, { path: '/' });
  else event.cookies.delete(COOKIE_SESSION_NAME, { path: '/' });

  return json({ ok: true });
};
