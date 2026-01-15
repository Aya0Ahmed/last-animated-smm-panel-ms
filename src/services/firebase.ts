// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpVTkfo44yH7V4RbrvVVMCdveQ4_X_4cE",
  authDomain: "atl3-trend.firebaseapp.com",
  projectId: "atl3-trend",
  storageBucket: "atl3-trend.firebasestorage.app",
  messagingSenderId: "993989650078",
  appId: "1:993989650078:web:0ce1ed75c9e285fb293d8f",
  measurementId: "G-K511JR01XY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);