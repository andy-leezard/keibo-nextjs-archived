import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import firebaseConfig from "@/lib/firebase.config"

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

export { firebaseConfig, app, rdb, strg, fdb, auth }
