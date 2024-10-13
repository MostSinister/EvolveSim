import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditComponentForm = ({ isOpen, onClose, componentType, entry, fetchEntries }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (entry) {
      setFormData(entry);
    }
  }, [entry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, componentType, entry.id);
      await updateDoc(docRef, formData);
      fetchEntries();
      onClose();
    } catch (error) {
      console.error('Error updating component:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Edit Component</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((field) => (
            field !== 'id' && (
              <div key={field}>
                <label className="block mb-2">{field}</label>
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500">Close</button>
      </div>
    </div>
  );
};

export default EditComponentForm;
