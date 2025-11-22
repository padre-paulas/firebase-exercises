import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC9PZMme2O1zjgZ43qxEzzPEFa171cAIzQ",
  authDomain: "react-firebase-7690b.firebaseapp.com",
  projectId: "react-firebase-7690b",
  storageBucket: "react-firebase-7690b.firebasestorage.app",
  messagingSenderId: "909974884394",
  appId: "1:909974884394:web:1b2693a53779aa65bab353",
  measurementId: "G-F3S4D5KZJX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);