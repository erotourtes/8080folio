import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, signInWithPopup, type Auth } from 'firebase/auth';
import { config } from './config';
import { refreshToken } from '$lib/api/auth';

const firebaseApp: FirebaseApp = initializeApp(config);

export const firebaseAuth: Auth = getAuth(firebaseApp);
const githubProvider = new GithubAuthProvider();
const scopes = ['read:user'];
scopes.forEach((scope) => githubProvider.addScope(scope));

/**
 * https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
 */
const firebaseSignIn = async (): Promise<{
  accessToken: string | null;
  jwtToken: string | null;
}> => {
  const result = await signInWithPopup(firebaseAuth, githubProvider);
  const credential = GithubAuthProvider.credentialFromResult(result);
  const accessToken = credential?.accessToken || null;
  const jwtToken = await result.user.getIdToken();

  await refreshToken(jwtToken);

  return {
    accessToken,
    jwtToken,
  };
};

const firebaseSignOut = async () => {
  await firebaseAuth.signOut();
};

export { firebaseSignIn, firebaseSignOut };
