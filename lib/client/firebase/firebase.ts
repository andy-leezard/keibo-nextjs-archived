import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Realtime Database and get a reference to the service
const rdb = getDatabase(app)

// Initialize Storage and get a reference to the service
const strg = getStorage(app)

// Initialize Cloud Firestore and get a reference to the service
const fdb = getFirestore(app)

// Initialize Auth feature and get a reference to the service
const auth = getAuth(app)

export { app, rdb, strg, fdb, auth }
