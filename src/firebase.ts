
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC5ZioWYLAt-tO5rForS2mustoQiaEm2tw",
  authDomain: "ktlwitter.firebaseapp.com",
  projectId: "ktlwitter",
  storageBucket: "ktlwitter.appspot.com",
  messagingSenderId: "829592735327",
  appId: "1:829592735327:web:bde9be9a3bea20ded255ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);