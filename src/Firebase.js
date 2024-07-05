// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "your auth domain",
  projectId: "your project id",
  storageBucket: "your storage bucket",
  messagingSenderId: "messaging sender id ",
  appId: "app id "
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//intilize firebase auth.and get a reference to the service
export const auth =getAuth(app)
export const db=getFirestore(app);
export const storage=getStorage(app)
export default app;