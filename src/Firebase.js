// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA27NqehedpwJ_aKxnCyZaF5U9w7skzvHs",
  authDomain: "hospital-managment-final.firebaseapp.com",
  projectId: "hospital-managment-final",
  storageBucket: "hospital-managment-final.appspot.com",
  messagingSenderId: "176091692473",
  appId: "1:176091692473:web:effe3a2d6bfc7f47f8ca68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//intilize firebase auth.and get a reference to the service
export const auth =getAuth(app)
export const db=getFirestore(app);
export default app;