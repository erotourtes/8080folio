import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GithubAuthProvider,
  setPersistence,
  signInWithPopup,
  type Auth,
} from 'firebase/auth';
import { config } from './config';

const firebaseApp: FirebaseApp = initializeApp(config);

const firebaseAuth: Auth = getAuth(firebaseApp);
setPersistence(firebaseAuth, { type: 'NONE' });
const githubProvider = new GithubAuthProvider();
const scopes = ['read:user'];

/**
 * https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
 */
const signIn = async (): Promise<{
  accessToken: string | null;
  jwtToken: string | null;
}> => {
  scopes.forEach((scope) => githubProvider.addScope(scope));

  const result = await signInWithPopup(firebaseAuth, githubProvider);
  const credential = GithubAuthProvider.credentialFromResult(result);
  const accessToken = credential?.accessToken || null;
  const jwtToken = await result.user.getIdToken();

  // TODO: setup server side authorisation
  await firebaseAuth.signOut();
  return {
    accessToken,
    jwtToken,
  };
};

export { signIn };
