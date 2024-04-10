// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOFrinZKnYgH-beWOjdbsIAyfvYsUtMOk",
  authDomain: "budgify-a4283.firebaseapp.com",
  projectId: "budgify-a4283",
  storageBucket: "budgify-a4283.appspot.com",
  messagingSenderId: "79509436578",
  appId: "1:79509436578:web:cbb324e2aed1f1dadb7ffb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
