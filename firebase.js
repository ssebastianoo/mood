import { initializeApp } from "firebase/app";
import {
    getFirestore,
    query,
    orderBy,
    getDocs,
    where,
    setDoc,
    deleteDoc,
    doc,
    collection,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "mood-2652d.firebaseapp.com",
    projectId: "mood-2652d",
    storageBucket: "mood-2652d.appspot.com",
    messagingSenderId: "1047473388118",
    appId: "1:1047473388118:web:3cd025ebf1bc398de359f7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function randomID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

async function getMoods(uid) {
    const q = query(
        collection(db, "moods"),
        orderBy("timestamp", "desc"),
        where("uid", "==", uid)
    );
    const docs = await getDocs(q);
    const data = [];
    docs.forEach((doc) => data.push(doc.data()));
    return data;
}

async function addMood(data) {
    const id = randomID();
    data.id = id;
    await setDoc(doc(db, "moods", id), data);
}

async function deleteMood(id) {
    await deleteDoc(doc(db, "moods", id));
}

export { app, db, auth, getMoods, randomID, addMood, deleteMood };
