import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyAcKSXFyL29ltYj_KLURVPXKeEVXNtVEfM",
    authDomain: "examx-10474.firebaseapp.com",
    databaseURL: "https://examx-10474-default-rtdb.firebaseio.com",
    projectId: "examx-10474",
    storageBucket: "examx-10474.appspot.com",
    messagingSenderId: "542640981812",
    appId: "1:542640981812:web:7ddf38e2209afb5431c761"
};

// Initialize Firebase
fb.initializeApp(firebaseConfig);

const db = fb.firestore();

export default {
  fb,
  db
};