// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUO8FDKV1iqsk_PaACNsBWu-I1NfRTfa4",
  authDomain: "basketapp-a14bb.firebaseapp.com",
  projectId: "basketapp-a14bb",
  storageBucket: "basketapp-a14bb.appspot.com",
  messagingSenderId: "219787223865",
  appId: "1:219787223865:web:c2dc20cfcef29114837ee8",
  measurementId: "G-E02WPNCYZE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
var loggedInUser: string;
export function setLoggedInUser(userName: string){
  loggedInUser = userName;
}
export function getLoggedInUser(){
  return loggedInUser;
}
export const db = getFirestore(app);
export const storage = getStorage(app);
