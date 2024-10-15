// StructureEditor.js
// This component provides an interface for editing the biological components structure.
// It allows users to view and modify the structure in JSON format.

import React, { useState, useEffect } from 'react';
import { getStructure, updateStructure } from '../utils/structureParser';

function StructureEditor() {
  // State to hold the current structure
  const [structure, setStructure] = useState({});

  // Effect to load the initial structure when the component mounts
  useEffect(() => {
    setStructure(getStructure());
  }, []);

  // Handler for structure changes in the textarea
  const handleStructureChange = (e) => {
    setStructure(JSON.parse(e.target.value));
  };

  // Handler for saving the updated structure
  const handleSave = () => {
    updateStructure(structure);
    alert('Structure updated successfully');
  };

  return (
    <div>
      <h2>Edit Biological Components Structure</h2>
      {/* Textarea for editing the structure in JSON format */}
      <textarea
        value={JSON.stringify(structure, null, 2)}
        onChange={handleStructureChange}
        rows={20}
        className="w-full p-2 border rounded"
      />
      {/* Save button */}
      <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Save Structure
      </button>
    </div>
  );
}

export default StructureEditor;
