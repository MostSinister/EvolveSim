// src/components/NewComponentForm.js

import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import fieldOrder from '../fieldOrder';

function NewComponentForm({ componentType, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({});
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
      <h2 className="mb-4 text-xl font-semibold">Add New {componentType.slice(0, -1)}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {orderedFields.map((key) => (
          <div key={key}>
            <label className="block mb-1 capitalize" htmlFor={key}>
              {key}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key] || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
        ))}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default NewComponentForm;
