// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getEvn } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: getEvn('VITE_FIREBASE_API'),
  authDomain: "blogapp-b08b1.firebaseapp.com",
  projectId: "blogapp-b08b1",
  storageBucket: "blogapp-b08b1.firebasestorage.app",
  messagingSenderId: "310965790859",
  appId: "1:310965790859:web:0068a75714053b27f00c8e",
  measurementId: "G-06HRLWSKR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth= getAuth(app);
const provider = new GoogleAuthProvider()

export { auth, provider }