// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3p97ZP39Y7AJxnjV0Fe-nqzUMhj1OUIw",
  authDomain: "react-booking-system-1e238.firebaseapp.com",
  projectId: "react-booking-system-1e238",
  storageBucket: "react-booking-system-1e238.appspot.com",
  messagingSenderId: "747887211667",
  appId: "1:747887211667:web:5310830f4ca4bd9327c966",
  measurementId: "G-LGQHRM6MTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);