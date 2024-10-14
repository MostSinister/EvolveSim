// src/components/EditComponentForm.js

import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import fieldOrder from '../fieldOrder'; // Import the field order configuration

function EditComponentForm({ componentType, componentData, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({});

  // Initialize form data with componentData when componentData changes
  useEffect(() => {
    setFormData({ ...componentData }); // Initialize form data with componentData
  }, [componentData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass updated data back to AdminPage
  };

  // Get the ordered fields for the current component type
  const orderedFields = fieldOrder[componentType] || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
        Edit {componentType.slice(0, -1)}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dynamic form fields based on componentData */}
        {orderedFields.map((key) => (
          <div key={key}>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 capitalize" htmlFor={key}>
              {key}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key] || ''} // Ensure the input value is set
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
        ))}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditComponentForm;
