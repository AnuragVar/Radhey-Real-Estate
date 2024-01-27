// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWPx-X60ZNolwNYGDyEPkWOedycDhvBlk",
  authDomain: "radhey-estate.firebaseapp.com",
  projectId: "radhey-estate",
  storageBucket: "radhey-estate.appspot.com",
  messagingSenderId: "786433807472",
  appId: "1:786433807472:web:fc755ebf834ca324a110b5",
  measurementId: "G-P74MQHRYGW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
