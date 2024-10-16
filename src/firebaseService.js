// firebaseService.js
// This module provides utility functions for interacting with Firebase Firestore.
// It includes operations for fetching, adding, updating, and deleting documents,
// as well as importing and exporting collection data.

import { db } from './firebase'; // Import the Firestore database instance
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

// Helper function to convert field names containing '/' to '_'
const convertFieldNames = (data) => {
  const convertedData = {};
  for (const [key, value] of Object.entries(data)) {
    const safeKey = key.replace('/', '_');
    convertedData[safeKey] = value;
  }
  return convertedData;
};

// Fetch all documents from a specified collection
export const fetchCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(`Fetched ${data.length} documents from ${collectionName}:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching collection ${collectionName}:`, error);
    return [];
  }
};

// Delete a document from a specified collection
export const deleteDocument = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};

// Update a document in a specified collection
export const updateDocument = async (collectionName, id, data) => {
  const { isValid, convertedData } = validateAndConvertData(collectionName, data);
  if (!isValid) {
    throw new Error('Invalid data structure');
  }
  const safeData = convertFieldNames(convertedData);
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, safeData);
};

// Add a new document to a specified collection
export const addDocument = async (collectionName, data) => {
  const { isValid, convertedData } = validateAndConvertData(collectionName, data);
  if (!isValid) {
    throw new Error('Invalid data structure');
  }
  const safeData = convertFieldNames(convertedData);
  const docRef = await addDoc(collection(db, collectionName), safeData);
  return { id: docRef.id, ...safeData };
};

// Subscribe to real-time updates from a specified collection
export const subscribeToCollection = (collectionName, callback) => {
  console.log(`Subscribing to collection: ${collectionName}`);
  const collectionRef = collection(db, collectionName);
  return onSnapshot(collectionRef, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(`Received ${data.length} documents from ${collectionName}:`, data);
    callback(data);
  }, (error) => {
    console.error(`Error in subscription to ${collectionName}:`, error);
  });
};

// Export a collection to a JSON file
export const exportCollectionToJSON = async (collectionName) => {
  const data = await fetchCollection(collectionName);
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${collectionName}.json`;
  link.click();
};

// Import data from a JSON file into a specified collection
export const importCollectionFromJSON = async (collectionName, jsonFile) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const data = JSON.parse(e.target.result);
    const existingDocs = await fetchCollection(collectionName);
    const existingIds = new Set(existingDocs.map(doc => doc.id));

    for (const item of data) {
      if (existingIds.has(item.id)) {
        // Update existing document
        await updateDocument(collectionName, item.id, item);
      } else {
        // Add new document
        await addDocument(collectionName, item);
      }
    }
  };
  reader.readAsText(jsonFile);
};
