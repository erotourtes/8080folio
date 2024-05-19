import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAdditionalUserInfo,
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  type Auth,
} from 'firebase/auth';
import type { TUserProfile } from '$lib/types/types';
import { config } from './config';

const firebaseApp: FirebaseApp = initializeApp(config);

const githubProvider = new GithubAuthProvider();
// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
const scopes = ['read:user', 'public_repo'];
scopes.forEach((scope) => githubProvider.addScope(scope));

const firebaseAuth: Auth = getAuth(firebaseApp);

const signIn = async (): Promise<TUserProfile | null> => {
  try {
    const result = await signInWithPopup(firebaseAuth, githubProvider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const info = getAdditionalUserInfo(result);
    // const user = result.user;
    if (credential === null || info === null) return null;
    // const token = credential.accessToken;

    const { isNewUser, profile, username } = info;
    const { id, name, email, avatar_url, public_repos, repos_url, bio } = profile as any;
    console.log(profile);

    const userProfile: TUserProfile = {
      isNewUser,
      username: username,
      bio: (bio || '') as TUserProfile['bio'],
      email: email as TUserProfile['email'],
      githubId: id as TUserProfile['githubId'],
      name: name as TUserProfile['name'],
      avatarUrl: avatar_url as TUserProfile['avatarUrl'],
      publicReposNumber: (public_repos || 0) as TUserProfile['publicReposNumber'],
      reposUrl: repos_url as TUserProfile['reposUrl'],
    };

    return userProfile;
  } catch (error) {
    return null;
  }
};

export { signIn };
