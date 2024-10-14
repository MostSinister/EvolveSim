// firebaseService.js
import { db } from './firebase';
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';

// Fetch all documents from a specified collection
export const fetchCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(`Failed to fetch collection: ${error.message}`);
  }
};

// Add a new document to a collection
export const addDocument = async (collectionName, data) => {
  try {
    await addDoc(collection(db, collectionName), data);
  } catch (error) {
    throw new Error(`Failed to add document: ${error.message}`);
  }
};

// Update an existing document in a collection
export const updateDocument = async (collectionName, documentId, data) => {
  try {
    await updateDoc(doc(db, collectionName, documentId), data);
  } catch (error) {
    throw new Error(`Failed to update document: ${error.message}`);
  }
};

// Delete a document from a collection
export const deleteDocument = async (collectionName, documentId) => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
  } catch (error) {
    throw new Error(`Failed to delete document: ${error.message}`);
  }
};
