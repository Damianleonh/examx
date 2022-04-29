import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAcKSXFyL29ltYj_KLURVPXKeEVXNtVEfM",
    authDomain: "examx-10474.firebaseapp.com",
    projectId: "examx-10474",
    storageBucket: "examx-10474.appspot.com",
    messagingSenderId: "542640981812",
    appId: "1:542640981812:web:7ddf38e2209afb5431c761"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;

