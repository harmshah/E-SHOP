// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import the database module

// Firebase config data
const firebaseConfig = {
  apiKey: "AIzaSyCELUpXhpDz9jIpPv85JaqTQKI98ZOHvjY",
  authDomain: "authenticationdemo-76bc7.firebaseapp.com",
  projectId: "authenticationdemo-76bc7",
  storageBucket: "authenticationdemo-76bc7.appspot.com",
  messagingSenderId: "50641384241",
  appId: "1:50641384241:web:141046aef58d7af11bb610",
  measurementId: "G-T9780P25KX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the authentication instance from Firebase
const auth = getAuth();

// Get the database instance from Firebase
const database = getDatabase(app);

export { app, auth, database };