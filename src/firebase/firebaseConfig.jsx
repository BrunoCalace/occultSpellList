import firebase from 'firebase'
import 'firebase/firestore'


let config = {
  apiKey: "AIzaSyCldvVCNrCKqMT3h2QUa2W19LXQHPLlTK4",
  authDomain: "occultspelllist.firebaseapp.com",
  projectId: "occultspelllist",
  storageBucket: "occultspelllist.appspot.com",
  messagingSenderId: "425343963235",
  appId: "1:425343963235:web:f70fea3a5621ed3600e856"
};

firebase.initializeApp(config);

export default firebase.firestore();