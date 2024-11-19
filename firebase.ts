// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-qukHeCE7QNDQZy70jUiESiRMRfmCfYM",
    authDomain: "words-per-minute-3c32f.firebaseapp.com",
    projectId: "words-per-minute-3c32f",
    storageBucket: "words-per-minute-3c32f.firebasestorage.app",
    messagingSenderId: "903845694945",
    appId: "1:903845694945:web:3ce05149beb10888a4d6a0",
    measurementId: "G-G5GS1W6ZVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };