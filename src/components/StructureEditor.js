import React, { useState, useEffect } from 'react';
import { getStructure, updateStructure } from '../utils/structureParser';

function StructureEditor() {
  const [structure, setStructure] = useState({});

  useEffect(() => {
    setStructure(getStructure());
  }, []);

  const handleStructureChange = (e) => {
    setStructure(JSON.parse(e.target.value));
  };

  const handleSave = () => {
    updateStructure(structure);
    alert('Structure updated successfully');
  };

  return (
    <div>
      <h2>Edit Biological Components Structure</h2>
      <textarea
        value={JSON.stringify(structure, null, 2)}
        onChange={handleStructureChange}
        rows={20}
        className="w-full p-2 border rounded"
      />
      <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Save Structure
      </button>
    </div>
  );
}

export default StructureEditor;
