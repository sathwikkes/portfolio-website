import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";
import { logEvent, getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);

// Track a page view
export const trackPageView = (pageTitle, pageUrl) => {
  logEvent(analytics, 'page_view', {
    page_title: pageTitle,
    page_url: pageUrl,
  });
};

// Track a custom event for link clicks
export const trackLinkClick = (socialPlatform) => {
  logEvent(analytics, 'social_link_click', {
    platform: socialPlatform
  });
};

export const signInWithGoogle = () => signInWithPopup(auth, provider);