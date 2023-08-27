import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAwQ8PUB3y2G1gl_arv7-UheTgrMHA0XEg",
  authDomain: "multimart-ad78a.firebaseapp.com",
  projectId: "multimart-ad78a",
  storageBucket: "multimart-ad78a.appspot.com",
  messagingSenderId: "40334505648",
  appId: "1:40334505648:web:0145419a7dfc05c9686d75",
  measurementId: "G-PLX1CP1YRJ"
};


const app = initializeApp(firebaseConfig);
export const auth  =  getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)