import * as admin from 'firebase-admin';

export const initializeFirebase = () => {
  if (process.env.NODE_ENV === 'production') {
    // This works on Cloud Run automatically
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    console.log('Firebase initialized: Production (ADC)');
  } else {
    // This works for your local machine
    // Make sure firebase-auth.json is in your project root
    admin.initializeApp({
      credential: admin.credential.cert('./service-account.json'),
    });
    console.log('Firebase initialized: Local (Service Account Key)');
  }
};
