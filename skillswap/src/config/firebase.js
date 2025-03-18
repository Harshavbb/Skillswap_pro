// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Storage

const firebaseConfig = {
  apiKey: "AIzaSyCIMALMsB3HgioQgxmYnnnceK-vahQFjFg",
  authDomain: "skillswap-8e0f0.firebaseapp.com",
  projectId: "skillswap-8e0f0",
  storageBucket: "skillswap-8e0f0.appspot.com", // Fix the storageBucket name
  messagingSenderId: "1087954657262",
  appId: "1:1087954657262:web:00f0ebd66d8039e09278ff",
  measurementId: "G-C42NNSGM4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize Storage
