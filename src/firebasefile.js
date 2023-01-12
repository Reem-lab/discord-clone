import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCCNkwrABMJaAheqcACYPvnCw1YcByjrdc",
  authDomain: "discrode-clone.firebaseapp.com",
  projectId: "discrode-clone",
  storageBucket: "discrode-clone.appspot.com",
  messagingSenderId: "305034417097",
  appId: "1:305034417097:web:4d185e0341de8ef2aace18",
  measurementId: "G-GXQ87FVMW5"
};

const firsebaseApp = firebase.initializeApp(firebaseConfig);

const db = firsebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };
export default db;