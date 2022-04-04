// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcKSXFyL29ltYj_KLURVPXKeEVXNtVEfM",
    authDomain: "examx-10474.firebaseapp.com",
    projectId: "examx-10474",
    storageBucket: "examx-10474.appspot.com",
    messagingSenderId: "542640981812",
    appId: "1:542640981812:web:7ddf38e2209afb5431c761"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

const auth = firebase.auth()

export {auth};

