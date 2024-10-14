import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Trash, Edit3, Copy, Save, RefreshCw } from 'lucide-react';
import {
  subscribeToCollection,
  deleteDocument,
  updateDocument,
  addDocument,
} from '../firebaseService';
import NewComponentForm from './NewComponentForm';
import EditComponentForm from './EditComponentForm';
import biologicalStructure from '../Data/biological_components_structure.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';

const formatField = (key, value, componentType) => {
  if (value === null || value === undefined) return value;

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  switch (key) {
    case 'Sequence':
      return value.toUpperCase();
    case 'Name':
    case 'Type':
    case 'Description':
      return capitalizeWords(value);
    case 'Size':
      return ['Small', 'Medium', 'Large', 'X-Large'].includes(value) ? value : 'Medium';
    default:
      if (typeof value === 'number' || !isNaN(value)) {
        return value === '' ? 0 : Number(value);
      }
      return capitalizeWords(value);
  }
};

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

  const formatComponents = useCallback((data) => {
    return data.map(component => {
      const formattedComponent = { ...component };
      for (const field in biologicalStructure[componentType]) {
        formattedComponent[field] = formatField(field, component[field], componentType);
      }
      return formattedComponent;
    });
  }, [componentType]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToCollection(componentType, (data) => {
      const formattedData = formatComponents(data);
      setComponents(formattedData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [componentType, formatComponents]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this component?')) {
      try {
        await deleteDocument(componentType, id);
        toast.success('Component deleted successfully!');
      } catch (error) {
        console.error('Error deleting component:', error);
        toast.error('Failed to delete component.');
      }
    }
  };

  const handleEdit = (component) => {
    setSelectedComponent(component);
    setIsEditFormOpen(true);
  };

  const handleUpdate = async (updatedComponent) => {
    try {
      if (!updatedComponent.id) {
        throw new Error('Invalid document ID');
      }

      await updateDocument(componentType, updatedComponent.id, updatedComponent);
      setIsEditFormOpen(false);
      toast.success('Component updated successfully!');
    } catch (error) {
      console.error('Error updating component:', error);
      toast.error('Failed to update component.');
    }
  };

  const handleAdd = async (newComponentData) => {
    try {
      const { id, ...dataWithoutId } = newComponentData;
      await addDocument(componentType, dataWithoutId);
      setIsFormOpen(false);
      toast.success('New component added successfully!');
    } catch (error) {
      console.error('Error adding new component:', error);
      toast.error('Failed to add new component.');
    }
  };

  const handleDuplicate = async (component) => {
    const { id, ...duplicatedComponent } = component;
    await handleAdd(duplicatedComponent);
  };

  const handleFieldChange = async (id, field, value) => {
    try {
      const updatedComponent = components.find(comp => comp.id === id);
      if (!updatedComponent) return;

      const formattedValue = formatField(field, value, componentType);
      await updateDocument(componentType, id, { [field]: formattedValue });
    } catch (error) {
      console.error('Error updating field:', error);
      toast.error('Failed to update field.');
    }
  };

  const orderedFields = Object.keys(biologicalStructure[componentType]) || [];

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen`}>
      <ToastContainer />
      <div className="mb-4 flex space-x-2">
        {Object.keys(biologicalStructure).map((type) => (
          <button
            key={type}
            onClick={() => setComponentType(type)}
            className={`px-4 py-2 rounded ${componentType === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-700`}
          >
            {type}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-700 dark:text-gray-300">Loading...</p>
      ) : components.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">No components found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className={`w-full table-auto ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <thead>
              <tr>
                {orderedFields.map((key) => (
                  <th key={key} className="px-4 py-2 border-b">
                    {key}
                  </th>
                ))}
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {components.map((component) => (
                <tr
                  key={component.id}
                  className={`cursor-pointer ${themeClasses} transition duration-200 ease-in-out`}
                >
                  {orderedFields.map((key) => (
                    <td key={key} className="border px-4 py-2">
                      {key === 'Size' ? (
                        <select
                          value={component[key]}
                          onChange={(e) => handleFieldChange(component.id, key, e.target.value)}
                          className="w-full bg-transparent focus:outline-none"
                        >
                          {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={component[key]}
                          onChange={(e) => handleFieldChange(component.id, key, e.target.value)}
                          className="w-full bg-transparent focus:outline-none"
                        />
                      )}
                    </td>
                  ))}
                  <td className="border px-4 py-2 flex space-x-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEdit(component); }}
                      className="text-yellow-500 hover:text-yellow-700"
                      title="Edit"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(component.id); }}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDuplicate(component); }}
                      className="text-blue-500 hover:text-blue-700"
                      title="Duplicate"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
        title="Add New Component"
      >
        <PlusCircle className="w-6 h-6" />
      </button>

      <NewComponentForm
        componentType={componentType}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleAdd}
      />

      {selectedComponent && (
        <EditComponentForm
          componentType={componentType}
          componentData={selectedComponent}
          isOpen={isEditFormOpen}
          onClose={() => setIsEditFormOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

export default AdminPage;
