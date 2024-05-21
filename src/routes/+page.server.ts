import { test } from '$lib/server/firebase/firebase.admin.app.js';

export const load = async ({ locals }) => {
  await test();
  return {
    locals,
  };
};
