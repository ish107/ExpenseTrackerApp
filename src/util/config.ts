import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAvCI2df4zDY7FLKlVLKwBCp-Ln9nSt9K4",
  authDomain: "expence-tracker-51b42.firebaseapp.com",
  databaseURL: "https://expence-tracker-51b42-default-rtdb.firebaseio.com",
  projectId: "expence-tracker-51b42",
  storageBucket: "expence-tracker-51b42.appspot.com",
  messagingSenderId: "325679030861",
  appId: "1:325679030861:web:7fbdb26e3d5d56f139b204"
};


export const FIREBASE = initializeApp(firebaseConfig);