import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-KV9wZv2ik27s6Cj42MZJRBfq-PHw3kM",
  authDomain: "exam-1c79c.firebaseapp.com",
  projectId: "exam-1c79c",
  storageBucket: "exam-1c79c.firebasestorage.app",
  messagingSenderId: "68815611488",
  appId: "1:68815611488:web:e358b027bb9d42c5a24505",
  measurementId: "G-98DRH6XHYK"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Auth & Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

