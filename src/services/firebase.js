// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwGF62jOwVVsa_noeyWCuWKBkY3hEw8JU",
  authDomain: "the-movie-central.firebaseapp.com",
  projectId: "the-movie-central",
  storageBucket: "the-movie-central.appspot.com",
  messagingSenderId: "103408156885",
  appId: "1:103408156885:web:bde5becb65a77be35a225c",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
