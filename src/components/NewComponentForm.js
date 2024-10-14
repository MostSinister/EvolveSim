// NewComponentForm.js

import React, { useState } from 'react';
import { addDocument } from './firebaseService';

function NewComponentForm({ componentType, onClose, onSave }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComponent = await addDocument(componentType, formData);
      onSave(newComponent);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        {/* Dynamic form fields based on componentType */}
        {/* For this example, we'll assume fields 'name' and 'description' */}
        <div>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Close
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewComponentForm;
