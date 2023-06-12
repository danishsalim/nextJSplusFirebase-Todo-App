import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCkNstLCo9XxuzDcXN-YNyVAufxk5zpruM",
  authDomain: "fir-todo-a76ca.firebaseapp.com",
  projectId: "fir-todo-a76ca",
  storageBucket: "fir-todo-a76ca.appspot.com",
  messagingSenderId: "55200580763",
  appId: "1:55200580763:web:9d92458ec943e7eb0af23e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
