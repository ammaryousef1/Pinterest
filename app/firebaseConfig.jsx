import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD7xMh5oWLZ1ZdRxvyN8ySmXNp-yraLbUo",
  authDomain: "pinterest-19816.firebaseapp.com",
  projectId: "pinterest-19816",
  storageBucket: "pinterest-19816.appspot.com",
  messagingSenderId: "746022536382",
  appId: "1:746022536382:web:f040051b9e433428894aef",
  measurementId: "G-6N6CX07KJS"
};


const app = initializeApp(firebaseConfig);
export const auth  =  getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)