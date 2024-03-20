// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "process.env.REACT_APP_API_KEY",
  authDomain: "todo-c1f25.firebaseapp.com",
  projectId: "todo-c1f25",
  storageBucket: "todo-c1f25.appspot.com",
  messagingSenderId: "887241763567",
  appId: "1:887241763567:web:101b6f39c45605f400091a",
  measurementId: "G-95LB66S2JT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;