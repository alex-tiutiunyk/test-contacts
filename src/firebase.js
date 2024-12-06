import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const API_KEY = import.meta.env.VITE_API_KEY;


const firebaseConfig = {
  apiKey: (function(){
    return API_KEY.split('-').map(k => k.split('').reverse().join('')).join('-')
  })(),
  authDomain: "contacts-test-project-6ff56.firebaseapp.com",
  databaseURL: "https://contacts-test-project-6ff56-default-rtdb.firebaseio.com",
  projectId: "contacts-test-project-6ff56",
  storageBucket: "contacts-test-project-6ff56.firebasestorage.app",
  messagingSenderId: "1089080938649",
  appId: "1:1089080938649:web:e0b030e8f6dc2d7dd3a808"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const storage = getStorage(app)