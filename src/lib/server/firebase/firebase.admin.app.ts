import admin from 'firebase-admin';
import { FIREBASE_ADMIN_SDK } from '$env/static/private';

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(FIREBASE_ADMIN_SDK)),
});

export default adminApp;
