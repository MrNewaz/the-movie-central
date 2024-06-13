// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-AYIRP6BKq6snaQAqqkNV_R6yWmdMSM8",
  authDomain: "techcare-firebase.firebaseapp.com",
  projectId: "techcare-firebase",
  storageBucket: "techcare-firebase.appspot.com",
  messagingSenderId: "785691894450",
  appId: "1:785691894450:web:bd058f34e4f46a3feb5fab",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
