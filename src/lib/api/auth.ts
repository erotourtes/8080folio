import { COOKIE_SESSION_NAME } from '../../routes/auth/constants';

export const refreshToken = async (token?: string | null) => {
  await fetch('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ [COOKIE_SESSION_NAME]: token }),
  });
};
