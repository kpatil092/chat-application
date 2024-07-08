import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-e5636.firebaseapp.com", // auth domain 
  projectId: "reactchat-e5636", 
  storageBucket: "reactchat-e5636.appspot.com",  // need storage bucket id from firebase storage 
  messagingSenderId: "764524416622",             // Message sender ID
  appId: "1:764524416622:web:91820fcefbaa940966e07f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()