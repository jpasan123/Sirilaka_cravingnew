import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBPej8h3c1WUA5XSSJ1lgbQx19ncf_D1jo",
  authDomain: "srilakacraving.firebaseapp.com",
  projectId: "srilakacraving",
  storageBucket: "srilakacraving.appspot.com",
  messagingSenderId: "307794193234",
  appId: "1:307794193234:web:1db386d57e219f7d61e88b",
  measurementId: "G-ZCRDPP7KEK"
};


const app = initializeApp(firebaseConfig);
const authInstance = getAuth(app);
const firestoreInstance = getFirestore(app);
const storageInstance = getStorage(app);
const provider = new GoogleAuthProvider();

export { authInstance as auth, firestoreInstance as firestore, provider, storageInstance as storage }