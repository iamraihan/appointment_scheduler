// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVdWe8b67ov2aszh-xF5WtIJJXWnkFJGk",
  authDomain: "appointment-scheduler-5c078.firebaseapp.com",
  projectId: "appointment-scheduler-5c078",
  storageBucket: "appointment-scheduler-5c078.appspot.com",
  messagingSenderId: "1058028745208",
  appId: "1:1058028745208:web:5151e14f6d007941a7260d",
  measurementId: "G-Y86G1YZ1L0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
