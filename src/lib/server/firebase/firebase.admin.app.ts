if (typeof window !== 'undefined')
  throw new Error('This file should not be imported on the client side');

import { FIREBASE_ADMIN_SDK } from '$env/static/private';
import {
  PUBLIC_FIREBASE_AUTH_EMULATOR_HOST,
  PUBLIC_FIRESTORE_EMULATOR_HOST,
  PUBLIC_RUN_EMULATORS,
} from '$env/static/public';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

const getConfiguredAdminApp = () => {
  if (PUBLIC_RUN_EMULATORS === 'true') {
    process.env.FIRESTORE_EMULATOR_HOST = PUBLIC_FIRESTORE_EMULATOR_HOST;
    process.env.FIREBASE_AUTH_EMULATOR_HOST = PUBLIC_FIREBASE_AUTH_EMULATOR_HOST;
  }

  if (admin.apps.length) return admin.apps[0]!;
  return admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(FIREBASE_ADMIN_SDK)),
  });
};

const getConfiguredFirestore = () => {
  if (admin.apps.length) return admin.apps[0]!.firestore();

  const db = getFirestore();

  if (PUBLIC_RUN_EMULATORS === 'true' && PUBLIC_FIREBASE_AUTH_EMULATOR_HOST) {
    db.settings({ ignoreUndefinedProperties: true });
  }
  return db;
};

const adminApp = getConfiguredAdminApp();
const db = getConfiguredFirestore();

export const usersRef = await db.collection('users');
export const reposRef = await db.collection('repos');

export default adminApp;
