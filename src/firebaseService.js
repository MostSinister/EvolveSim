// firebaseService.js

import { db } from './firebase'; // Adjusted import to match your firebase.js file
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  onSnapshot
} from 'firebase/firestore';
import { validateData, validateAndConvertData } from './utils/structureParser';

const convertFieldNames = (data) => {
  const convertedData = {};
  for (const [key, value] of Object.entries(data)) {
    const safeKey = key.replace('/', '_');
    convertedData[safeKey] = value;
  }
  return convertedData;
};

export const fetchCollection = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteDocument = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};

export const updateDocument = async (collectionName, id, data) => {
  const { isValid, convertedData } = validateAndConvertData(collectionName, data);
  if (!isValid) {
    throw new Error('Invalid data structure');
  }
  const safeData = convertFieldNames(convertedData);
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, safeData);
};

export const addDocument = async (collectionName, data) => {
  const { isValid, convertedData } = validateAndConvertData(collectionName, data);
  if (!isValid) {
    throw new Error('Invalid data structure');
  }
  const safeData = convertFieldNames(convertedData);
  const docRef = await addDoc(collection(db, collectionName), safeData);
  return { id: docRef.id, ...safeData };
};

export const subscribeToCollection = (collectionName, callback) => {
  const collectionRef = collection(db, collectionName);
  return onSnapshot(collectionRef, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};
