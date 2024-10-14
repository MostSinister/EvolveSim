import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const EditComponentForm = ({ isOpen, onClose, componentType, entry, fetchEntries }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (entry) {
      setFormData(entry); // Initialize formData with entry data
    }
  }, [entry]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        handleSubmit(event); // Save changes and close form
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFormData = () => {
    // Add validation logic here
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry || !entry.id) {
      console.error('No entry ID found for updating.');
      alert('No entry ID found for updating.');
      return;
    }
    if (!validateFormData()) {
      console.error('Validation failed.');
      alert('Validation failed. Please check your input.');
      return;
    }
    setLoading(true);
    try {
      console.log('Attempting to update document with ID:', entry.id, 'in collection:', componentType);
      const docRef = doc(db, componentType, entry.id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.error('Document does not exist.');
        alert('The document you are trying to update does not exist.');
        return;
      }
      await updateDoc(docRef, formData);
      fetchEntries();
      onClose();
      alert('Component updated successfully!');
    } catch (error) {
      console.error('Error updating component:', error);
      alert('Failed to update component. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div ref={formRef} className="bg-white p-6 rounded-lg shadow-lg text-black w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit {componentType}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((field) => (
            field !== 'id' && (
              <div key={field}>
                <label className="block text-black mb-2">{field}</label>
                <input
                  type={typeof formData[field] === 'number' ? 'number' : 'text'}
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder={`Enter ${field}`}
                />
              </div>
            )
          ))}
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save and Close'}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500">Cancel</button>
      </div>
    </div>
  );
};

export default EditComponentForm;
