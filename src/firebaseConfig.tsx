// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGy6Oy2ljJTVOE973HaJM-X7l9TNEqAJo",
  authDomain: "kimo-connect.firebaseapp.com",
  projectId: "kimo-connect",
  storageBucket: "kimo-connect.appspot.com",
  messagingSenderId: "107770471274",
  appId: "1:107770471274:web:a27c1e309eb881ae577b13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const database = getFirestore(app);