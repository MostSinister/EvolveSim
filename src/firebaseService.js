// firebaseService.js

import { db } from './firebase'; // Adjusted import to match your firebase.js file
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from 'firebase/firestore';

export const fetchCollection = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteDocument = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};

export const updateDocument = async (collectionName, id, data) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
};

export const addDocument = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), data);
  return { id: docRef.id, ...data };
};
