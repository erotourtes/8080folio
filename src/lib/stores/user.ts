import { refreshToken } from '$lib/api/auth';
import { firebaseAuth, firebaseSignIn, firebaseSignOut } from '$lib/firebase/firebase.client';
import { type User } from 'firebase/auth';
import { writable } from 'svelte/store';

const createUserStore = () => {
  const { subscribe, set } = writable<User | null>(firebaseAuth.currentUser, () => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      set(user);

      const token = await user?.getIdToken();
      await refreshToken(token);
    });
    return () => {
      unsubscribe();
    };
  });

  return {
    subscribe,
    signIn: firebaseSignIn,
    signOut: firebaseSignOut,
  };
};

export const userStore = createUserStore();
