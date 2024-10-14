// src/components/NewComponentForm.js

import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import fieldOrder from '../fieldOrder';

function NewComponentForm({ componentType, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({}); // Reset form data when component type changes
  }, [componentType]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, type: componentType });
  };

  const orderedFields = fieldOrder[componentType] || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
        Add New {componentType.slice(0, -1)}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dynamic form fields based on selected component type */}
        {orderedFields.map((key) => (
          <div key={key}>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 capitalize" htmlFor={key}>
              {key}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key] || ''}
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
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default NewComponentForm;
