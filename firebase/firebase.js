// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDMsQylr_eX1a_f6SX4j3OYL-ZmW_GDWoA",

  authDomain: "fbauth-dec54.firebaseapp.com",

  projectId: "fbauth-dec54",

  storageBucket: "fbauth-dec54.appspot.com",

  messagingSenderId: "233027213460",

  appId: "1:233027213460:web:b12697b40a517128f97c81",

  measurementId: "G-43JH9EGQ0Q",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export { app };
