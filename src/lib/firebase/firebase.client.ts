import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  type Auth,
} from 'firebase/auth';
import { config } from './config';
import { refreshToken } from '$lib/api/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import {
  PUBLIC_FIREBASE_AUTH_EMULATOR_HOST,
  PUBLIC_FIRESTORE_EMULATOR_HOST,
  PUBLIC_RUN_EMULATORS,
} from '$env/static/public';

const firebaseApp: FirebaseApp = initializeApp(config);

export const firebaseDb = getFirestore(firebaseApp);
export const firebaseAuth: Auth = getAuth(firebaseApp);

if (PUBLIC_RUN_EMULATORS === 'true') {
  if (PUBLIC_FIRESTORE_EMULATOR_HOST) connectFirestoreEmulator(firebaseDb, 'localhost', 8080);
  if (PUBLIC_FIREBASE_AUTH_EMULATOR_HOST)
    connectAuthEmulator(firebaseAuth, 'http://localhost:9099', { disableWarnings: true });
}

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
