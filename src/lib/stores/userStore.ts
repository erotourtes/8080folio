import { writable } from 'svelte/store';
import { signIn } from '$lib/firebase/firebase.app';
import type { TUserProfile } from '$lib/types/types';

const createUserStore = () => {
  const userStore = writable<TUserProfile | null>(null);

  return {
    subscribe: userStore.subscribe,
    signIn: () => signIn().then(userStore.set),
  };
};

export const userStore = createUserStore();
