// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getStorage } from "@firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBj_K-3IQ24Bb71VwXiGM5tw2hEJHWhbY",
  authDomain: "app-farmacia-65a5e.firebaseapp.com",
  projectId: "app-farmacia-65a5e",
  storageBucket: "app-farmacia-65a5e.appspot.com",
  messagingSenderId: "289542984629",
  appId: "1:289542984629:web:91818bffa197bf0f2c3ffc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export {database , storage };