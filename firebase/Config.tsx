import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBRKa3RiR1trWM5FyEFUE1KTg-JbJXjj4M",
  authDomain: "lm-prueba.firebaseapp.com",
  databaseURL: "https://lm-prueba-default-rtdb.firebaseio.com",
  projectId: "lm-prueba",
  storageBucket: "lm-prueba.firebasestorage.app",
  messagingSenderId: "452418588080",
  appId: "1:452418588080:web:aa06290a46e84e74cbda75",

};

// Initialize Firebaser
 const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
