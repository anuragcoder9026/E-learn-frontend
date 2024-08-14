import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDBoF2Gxq6jgdUGZGntUbWNMh7tQHiklac",
    authDomain: "e-learn-cd804.firebaseapp.com",
    projectId: "e-learn-cd804",
    storageBucket: "e-learn-cd804.appspot.com",
    messagingSenderId: "120475132436",
    appId: "1:120475132436:web:676d44623530ebbebf7d01",
    measurementId: "G-3LQ9HRTW5E"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export default db;