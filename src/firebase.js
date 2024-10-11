// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWDuf0OWOXPDp7At7PParl5QA_JCSOS9c",
  authDomain: "evolvesim-516fa.firebaseapp.com",
  projectId: "evolvesim-516fa",
  storageBucket: "evolvesim-516fa.appspot.com",
  messagingSenderId: "902037478641",
  appId: "1:902037478641:web:bb6fa03f9a945915f61d50",
  measurementId: "G-T6XTP3F6CM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);