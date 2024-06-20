import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAwiP8p6A1OMBCQEsq41BWk5NCgVDW7mSE",
  authDomain: "justtesting-42b98.firebaseapp.com",
  databaseURL: "https://justtesting-42b98-default-rtdb.firebaseio.com",
  projectId: "justtesting-42b98",
  storageBucket: "justtesting-42b98.appspot.com",
  messagingSenderId: "54031840870",
  appId: "1:54031840870:web:db3a29f806385bd0d85fa7",
  measurementId: "G-1W1B8F2V77"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
