// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDoGL5NS0vLzkNUQdm7CWwL4uCxXr1kNM",
  authDomain: "mmbase-trial.firebaseapp.com",
  projectId: "mmbase-trial",
  storageBucket: "mmbase-trial.appspot.com",
  messagingSenderId: "433585855069",
  appId: "1:433585855069:web:899d7d2132ca077a7dcbb4",
  measurementId: "G-2C618X4VCZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db };
