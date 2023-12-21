// firebase.js
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
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
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { analytics, auth, db };
export default app;
