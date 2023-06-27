// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV_rLUlyJJt-MSU2yuanTBf0cZQINaGZ8",
  authDomain: "todo-app-cda42.firebaseapp.com",
  projectId: "todo-app-cda42",
  storageBucket: "todo-app-cda42.appspot.com",
  messagingSenderId: "60115836391",
  appId: "1:60115836391:web:9c3b9aaf5e4bf29e5a7142"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);