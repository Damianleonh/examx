import firebase, { db } from 'firebase';
import { collection, getDocs, getDoc, query, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";


const personsCollection = collection(db, 'persons');

// ALTA
const savePersons = (name) => {
    addDoc(personsCollection, { name });
}
