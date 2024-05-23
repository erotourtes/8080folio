import { type FirebaseOptions } from 'firebase/app';
import * as conf from '$env/static/public';
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
  apiKey: conf.PUBLIC_FIREBASE_API_KEY,
  authDomain: conf.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: conf.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: conf.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: conf.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: conf.PUBLIC_FIREBASE_APP_ID,
  measurementId: conf.PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const config = scheme.parse(firebaseConfig);
