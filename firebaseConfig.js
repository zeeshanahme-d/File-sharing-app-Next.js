// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "saltn-pepper.firebaseapp.com",
  projectId: "saltn-pepper",
  storageBucket: "saltn-pepper.appspot.com",
  messagingSenderId: "528792556737",
  appId: "1:528792556737:web:2fa0369ba367e44ed57040",
  measurementId: "G-P233HNH3DJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;