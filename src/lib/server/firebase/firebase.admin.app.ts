import admin from 'firebase-admin';
import { FIREBASE_ADMIN_SDK } from '$env/static/private';
import { getFirestore } from 'firebase-admin/firestore';

const getAdminApp = () => {
  if (admin.apps.length) return admin.apps[0]!;
  return admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(FIREBASE_ADMIN_SDK)),
  });
};

const adminApp = getAdminApp();
const db = getFirestore();
export const usersRef = await db.collection('users');

export const test = async () => {
  const data = (await usersRef.doc('SLxCyho7soIEK79Oen3z').get()).data();
  console.log(data);
};

export default adminApp;
