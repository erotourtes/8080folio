import { type FirebaseOptions } from 'firebase/app';
import { getConfig } from '$lib/utils/config';
import { z } from 'zod';

const scheme = z.object({
  apiKey: z.string(),
  authDomain: z.string(),
  projectId: z.string(),
  storageBucket: z.string(),
  messagingSenderId: z.string(),
  appId: z.string(),
  measurementId: z.string(),
});

const firebaseConfig: FirebaseOptions = {
  apiKey: getConfig('VITE_FIREBASE_API_KEY'),
  authDomain: getConfig('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getConfig('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getConfig('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getConfig('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getConfig('VITE_FIREBASE_APP_ID'),
  measurementId: getConfig('VITE_FIREBASE_MEASUREMENT_ID'),
};

export const config = scheme.parse(firebaseConfig);
