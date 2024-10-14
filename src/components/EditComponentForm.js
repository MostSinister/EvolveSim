// EditComponentForm.js

import React, { useState } from 'react';

function EditComponentForm({ componentType, componentData, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...componentData });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        {/* Dynamic form fields based on componentData */}
        {Object.keys(componentData)
          .filter((key) => key !== 'id')
          .map((key) => (
            <div key={key}>
              <label className="block mb-2 capitalize">{key}:</label>
              <input
                type="text"
                name={key}
                value={formData[key] || ''}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
          ))}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Close
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditComponentForm;
