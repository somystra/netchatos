// Firebase import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// YOUR CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyBqKqszWBCMrKIjN0Wb9PxC7wArkjd5FSU",
    authDomain: "netchat-52007.firebaseapp.com",
    databaseURL: "https://netchat-52007-default-rtdb.firebaseio.com",
    projectId: "netchat-52007",
    storageBucket: "netchat-52007.firebasestorage.app",
    messagingSenderId: "145404562699",
    appId: "1:145404562699:web:5eeb4c6abc3e18675b660e",
    measurementId: "G-YKM3J5YR9F"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
