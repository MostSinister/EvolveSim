import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const NewComponentForm = ({ isOpen, onClose, componentType, fetchEntries }) => {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = getRequiredFields(componentType);

    for (let field of requiredFields) {
      if (!formData[field]) {
        setStatus(`All fields are required for ${componentType}.`);
        return;
      }
    }

    try {
      await addDoc(collection(db, componentType), formData);
      setStatus('Component added successfully!');
      setFormData({});
      fetchEntries();
      onClose();
    } catch (error) {
      console.error('Error adding component:', error);
      setStatus('Failed to add component.');
    }
  };

  const getRequiredFields = (type) => {
    switch (type) {
      case 'Cells':
        return ['Cell Type Name', 'Subcategory', 'Sequence', 'Health', 'Energy Cost', 'Size', 'Armor'];
      case 'Neurons':
        return ['Neuron Type Name', 'Subcategory', 'Sequence', 'Behavior', 'Receptor Slots', 'Output Slots'];
      case 'Synapses':
        return ['Synapse Type Name', 'Subcategory', 'Sequence', 'Rules (Math Expressions)', 'Expected Attributes', 'Condition Expression', 'Value'];
      case 'Genes':
        return ['Gene Type Name', 'Subcategory', 'Sequence', 'Bonus Type', 'Cell Bonus/Cost (Integer)'];
      default:
        return [];
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">New Component</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {getRequiredFields(componentType).map((field) => (
            <div key={field}>
              <label className="block mb-2">{field}</label>
              <input
                type={field.includes('Value') || field.includes('Cost') || field.includes('Slots') || field.includes('Health') || field.includes('Armor') ? 'number' : 'text'}
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Component
          </button>
        </form>
        {status && <p className="mt-4">{status}</p>}
        <button onClick={onClose} className="mt-4 text-red-500">Close</button>
      </div>
    </div>
  );
};

export default NewComponentForm;
