// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdIcL1mtM76a0haFE_WReYregXQzr11To",
  authDomain: "app-farm-d3783.firebaseapp.com",
  databaseURL: "https://app-farm-d3783-default-rtdb.firebaseio.com",
  projectId: "app-farm-d3783",
  storageBucket: "app-farm-d3783.appspot.com",
  messagingSenderId: "975400854025",
  appId: "1:975400854025:web:660855a9ee288a08b40ed8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export { database, storage };
