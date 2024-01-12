import 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Import Firestore functions

import 'firebase/storage';
import { getStorage } from 'firebase/storage';

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyDyeYIm0erfrkgSJ4WQsNUE2c_G0xhtzNM",
  authDomain: "tagore-project.firebaseapp.com",
  projectId: "tagore-project",
  storageBucket: "tagore-project.appspot.com",
  messagingSenderId: "1075554845738",
  appId: "1:1075554845738:web:0f90398aed7f8c2bb0af53"
});

export const storage = getStorage(firebaseConfig);
export const db = getFirestore(firebaseConfig); // Create a reference to the Firestore database




