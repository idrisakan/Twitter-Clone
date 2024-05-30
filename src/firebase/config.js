// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHsQa9M0Q-ZVOdabkCKHZrX7rn_Va7qaM",
  authDomain: "twitter-54753.firebaseapp.com",
  projectId: "twitter-54753",
  storageBucket: "twitter-54753.appspot.com",
  messagingSenderId: "482323110214",
  appId: "1:482323110214:web:1cc2da0d255fb7e91e2d47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth hizmetini referansını al
export const auth = getAuth(app);

//google sağlayıcısının kurulumu
export const provider = new GoogleAuthProvider();

//veri tabanının referansını al
export const db = getFirestore(app);

//getstorage referansını al
export const storage = getStorage(app);
