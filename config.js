// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARm7GqLBH6gxygXscDywAG5o8kzGaBlJg",
  authDomain: "airline-reservation-826f3.firebaseapp.com",
  projectId: "airline-reservation-826f3",
  storageBucket: "airline-reservation-826f3.firebasestorage.app",
  messagingSenderId: "431878623211",
  appId: "1:431878623211:web:59381a6db46aeda97793ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);