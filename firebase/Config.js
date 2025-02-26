import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, deleteDoc, doc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore'

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID
}

initializeApp(firebaseConfig)

const firestore = getFirestore()

const ITEMS = 'items'

export {
    firestore,
    collection,
    addDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    ITEMS
}