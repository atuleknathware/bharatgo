// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAv8HWUZ68fjeSpPhggqwPfgDvzr2WkGp4",
  authDomain: "bharatgo-ecommerce.firebaseapp.com",
  projectId: "bharatgo-ecommerce",
  storageBucket: "bharatgo-ecommerce.firebasestorage.app",
  messagingSenderId: "149806750122",
  appId: "1:149806750122:web:e022e1dd10835c94c873d3",
  measurementId: "G-LJZDLQE57H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Export Firebase Auth
export const auth = getAuth(app);
