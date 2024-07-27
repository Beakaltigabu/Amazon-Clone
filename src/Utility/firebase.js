
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAQNcufI0ureiKy2FNe8vaQrj1kxxhcAzk",
  authDomain: "clone-f6ae6.firebaseapp.com",
  projectId: "clone-f6ae6",
  storageBucket: "clone-f6ae6.appspot.com",
  messagingSenderId: "676300956178",
  appId: "1:676300956178:web:aaf31cf069910b0ba52ecb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
