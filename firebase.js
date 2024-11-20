"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// Import the functions you need from the SDKs you need
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyC-qukHeCE7QNDQZy70jUiESiRMRfmCfYM",
    authDomain: "words-per-minute-3c32f.firebaseapp.com",
    projectId: "words-per-minute-3c32f",
    storageBucket: "words-per-minute-3c32f.firebasestorage.app",
    messagingSenderId: "903845694945",
    appId: "1:903845694945:web:3ce05149beb10888a4d6a0",
    measurementId: "G-G5GS1W6ZVZ"
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
var db = (0, firestore_1.getFirestore)(app);
exports.db = db;
