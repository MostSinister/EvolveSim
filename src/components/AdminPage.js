// AdminPage.js

import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash, Edit3 } from 'lucide-react';
import { fetchCollection, deleteDocument, updateDocument } from './firebaseService';
import NewComponentForm from './NewComponentForm';
import EditComponentForm from './EditComponentForm';

function AdminPage({ isDarkMode }) {
  const [componentType, setComponentType] = useState('Cells');
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const themeClasses = isDarkMode
    ? 'bg-gray-900 text-white hover:bg-gray-800'
    : 'bg-white text-black hover:bg-gray-100';

  useEffect(() => {
    setLoading(true);
    fetchCollection(componentType)
      .then((data) => {
        setComponents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching components:', error);
        setLoading(false);
      });
  }, [componentType]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this component?')) {
      await deleteDocument(componentType, id);
      setComponents(components.filter((comp) => comp.id !== id));
    }
  };

  const handleEdit = (component) => {
    setSelectedComponent(component);
    setIsEditFormOpen(true);
  };

  const handleUpdate = async (updatedComponent) => {
    await updateDocument(componentType, updatedComponent.id, updatedComponent);
    setComponents(
      components.map((comp) =>
        comp.id === updatedComponent.id ? updatedComponent : comp
      )
    );
    setIsEditFormOpen(false);
  };

  const handleAdd = (newComponent) => {
    setComponents([...components, newComponent]);
    setIsFormOpen(false);
  };

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Component Type Selection */}
      <div className="mb-4">
        <label htmlFor="componentType" className="mr-2">
          Select Component Type:
        </label>
        <select
          id="componentType"
          value={componentType}
          onChange={(e) => setComponentType(e.target.value)}
          className={`p-2 border rounded ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
          }`}
        >
          <option value="Cells">Cells</option>
          <option value="Neurons">Neurons</option>
          <option value="Synapses">Synapses</option>
          <option value="Genes">Genes</option>
        </select>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className={`w-full table-auto ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <thead>
            <tr>
              {components.length > 0 &&
                Object.keys(components[0])
                  .filter((key) => key !== 'id')
                  .map((key) => (
                    <th key={key} className="px-4 py-2">
                      {key}
                    </th>
                  ))}
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {components.map((component) => (
              <tr
                key={component.id}
                className={`cursor-pointer ${themeClasses} transition duration-200 ease-in-out`}
              >
                {Object.keys(component)
                  .filter((key) => key !== 'id')
                  .map((key) => (
                    <td key={key} className="border px-4 py-2">
                      {component[key]}
                    </td>
                  ))}
                <td className="border px-4 py-2 flex space-x-2">
                  <button onClick={() => handleEdit(component)}>
                    <Edit3 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(component.id)}>
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Component Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-4 right-4 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
      >
        <PlusCircle className="w-8 h-8" />
      </button>

      {/* New Component Modal */}
      {isFormOpen && (
        <NewComponentForm
          componentType={componentType}
          onClose={() => setIsFormOpen(false)}
          onSave={handleAdd}
        />
      )}

      {/* Edit Component Modal */}
      {isEditFormOpen && selectedComponent && (
        <EditComponentForm
          componentType={componentType}
          componentData={selectedComponent}
          onClose={() => setIsEditFormOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

export default AdminPage;
