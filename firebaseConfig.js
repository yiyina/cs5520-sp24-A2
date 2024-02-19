// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGDR3lbA-Ccl5KiYrSvS6rl9DdIVE78Bo",
  authDomain: "cs5520-sp24-a2-57e96.firebaseapp.com",
  databaseURL: "https://cs5520-sp24-a2-57e96-default-rtdb.firebaseio.com",
  projectId: "cs5520-sp24-a2-57e96",
  storageBucket: "cs5520-sp24-a2-57e96.appspot.com",
  messagingSenderId: "224086231282",
  appId: "1:224086231282:web:8621333b13ba24381ba86b",
  measurementId: "G-M00WFSBVD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

console.log(firestore);
export { firestore };