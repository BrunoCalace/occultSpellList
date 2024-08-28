import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCldvVCNrCKqMT3h2QUa2W19LXQHPLlTK4",
  authDomain: "occultspelllist.firebaseapp.com",
  projectId: "occultspelllist",
  storageBucket: "occultspelllist.appspot.com",
  messagingSenderId: "425343963235",
  appId: "1:425343963235:web:f70fea3a5621ed3600e856"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;