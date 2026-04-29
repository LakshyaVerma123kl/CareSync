import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock_api_key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock_domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock_project_id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock_bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "mock_sender",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "mock_app_id"
};

// Initialize Firebase only if we have a real config, otherwise we'll use a mock fallback
// to ensure the app UI remains testable without config.
export const isMockEnv = firebaseConfig.apiKey === "mock_api_key";

let app;
let authInstance: any = null;

if (!isMockEnv) {
  try {
    app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
  } catch (error) {
    console.error("Firebase initialization error", error);
  }
}

export const auth = authInstance;
