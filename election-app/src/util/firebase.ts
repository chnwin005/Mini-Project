import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  } from 'firebase/firestore';
 
 
const firebaseConfig = {
  apiKey: "AIzaSyALbWJWgOLG2uvOIo2rpm0zsJTJDtktwoU",
  authDomain: "election-app-f7f58.firebaseapp.com",
  projectId: "election-app-f7f58",
  storageBucket: "election-app-f7f58.appspot.com",
  messagingSenderId: "815539006185",
  appId: "1:815539006185:web:50202e1a7d93ef4f025e78",
  measurementId: "G-W0S4H5FC8T"
};
 
 
  // Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
 
export { app, db, auth }