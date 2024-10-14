import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PlusCircle, Trash, Edit3, Copy, Save, RefreshCw, Download, Upload } from 'lucide-react';
import {
  subscribeToCollection,
  deleteDocument,
  updateDocument,
  addDocument,
  exportCollectionToJSON,
  importCollectionFromJSON,
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
import { getFieldType, getStructure } from '../utils/structureParser';

const formatField = (key, value, componentType) => {
  if (value === null || value === undefined) return value;

  const fieldType = getFieldType(componentType, key);
  console.log('Field type for', key, ':', fieldType);

  const capitalizeWords = (str) => {
    return String(str).replace(/\b\w/g, (char) => char.toUpperCase());
  };

  switch (fieldType) {
    case 'string':
      if (key === 'Sequence') {
        return String(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
      }
      return capitalizeWords(value);
    case 'integer':
    case 'number':
      return value === '' ? 0 : Number(value);
    case 'enum':
      return value;
    default:
      return value;
  }
};

function AdminPage({ isDarkMode }) {
  const [componentType, setComponentType] = useState('Cells');
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const importInputRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [resizing, setResizing] = useState(null);

  const themeClasses = isDarkMode
    ? 'bg-gray-800 text-white'
    : 'bg-white text-gray-800';

  const formatComponents = useCallback((data) => {
    return data.map(component => {
      const formattedComponent = { ...component };
      const componentStructure = getStructure()[componentType];
      if (componentStructure && componentStructure.properties) {
        for (const field in componentStructure.properties) {
          formattedComponent[field] = formatField(field, component[field], componentType);
        }
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

  useEffect(() => {
    // Load saved column widths from local storage for the current component type
    const savedWidths = localStorage.getItem(`columnWidths_${componentType}`);
    if (savedWidths) {
      setColumnWidths(JSON.parse(savedWidths));
    } else {
      // If no saved widths, set default widths
      const defaultWidths = {};
      orderedFields.forEach((field, index) => {
        defaultWidths[index] = 150; // Default width of 150px
      });
      setColumnWidths(defaultWidths);
    }
  }, [componentType]);

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

      const fieldType = getFieldType(componentType, field);
      let formattedValue;

      if (fieldType === 'integer' || fieldType === 'number') {
        formattedValue = value === '' ? 0 : Number(value);
      } else if (field === 'Sequence') {
        formattedValue = String(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
      } else {
        formattedValue = formatField(field, value, componentType);
      }

      // Replace '/' with '_' in the field name
      const safeField = field.replace('/', '_');

      await updateDocument(componentType, id, { [safeField]: formattedValue });
    } catch (error) {
      console.error('Error updating field:', error);
      toast.error('Failed to update field.');
    }
  };

  const orderedFields = Object.keys(biologicalStructure[componentType]?.properties || {});

  const handleExport = () => {
    exportCollectionToJSON(componentType);
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsImporting(true);
      try {
        await importCollectionFromJSON(componentType, file);
        toast.success('Import completed successfully!');
      } catch (error) {
        console.error('Error importing data:', error);
        toast.error('Failed to import data.');
      } finally {
        setIsImporting(false);
        if (importInputRef.current) {
          importInputRef.current.value = '';
        }
      }
    }
  };

  const startColumnResize = useCallback((index, startX) => {
    setResizing({ index, startX, initialWidth: columnWidths[index] || 150 });
  }, [columnWidths]);

  const handleMouseMove = useCallback((e) => {
    if (!resizing) return;

    const delta = e.clientX - resizing.startX;
    const newWidth = Math.max(50, resizing.initialWidth + delta); // Minimum width of 50px

    setColumnWidths(prevWidths => ({
      ...prevWidths,
      [resizing.index]: newWidth,
    }));
  }, [resizing]);

  const handleMouseUp = useCallback(() => {
    if (resizing) {
      // Save updated widths to local storage for the current component type
      localStorage.setItem(`columnWidths_${componentType}`, JSON.stringify(columnWidths));
    }
    setResizing(null);
  }, [resizing, componentType, columnWidths]);

  useEffect(() => {
    if (resizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, handleMouseMove, handleMouseUp]);

  const resetColumnWidths = useCallback(() => {
    const table = tableRef.current;
    if (!table) return;

    const newWidths = {};
    const headerCells = table.querySelectorAll('thead th');
    
    headerCells.forEach((cell, index) => {
      if (index < orderedFields.length) {
        // Temporarily set width to auto to get the content width
        cell.style.width = 'auto';
        const contentWidth = cell.offsetWidth;
        
        // Set a minimum width of 100px or content width, whichever is larger
        newWidths[index] = Math.max(100, contentWidth);
        
        // Reset the width to the new calculated width
        cell.style.width = `${newWidths[index]}px`;
      }
    });

    setColumnWidths(newWidths);
    localStorage.setItem(`columnWidths_${componentType}`, JSON.stringify(newWidths));
  }, [componentType, orderedFields.length]);

  return (
    <div className={`p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen`}>
      <ToastContainer />
      <div className="mb-8 flex flex-wrap gap-4">
        {Object.keys(biologicalStructure).map((type) => (
          <button
            key={type}
            onClick={() => setComponentType(type)}
            className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 ${
              componentType === type 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading...</p>
      ) : components.length === 0 ? (
        <p className="text-xl text-gray-700 dark:text-gray-300">No components found.</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <table ref={tableRef} className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                {orderedFields.map((key, index) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider relative whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ width: columnWidths[index] || 150, maxWidth: columnWidths[index] || 150 }}
                  >
                    {key}
                    <div
                      className="absolute top-0 right-0 bottom-0 w-1 cursor-col-resize bg-gray-300 dark:bg-gray-600 hover:bg-blue-500 dark:hover:bg-blue-400"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        startColumnResize(index, e.clientX);
                      }}
                    />
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '120px', minWidth: '120px' }}>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {components.map((component) => (
                <tr
                  key={component.id}
                  className={`${themeClasses} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ease-in-out`}
                >
                  {orderedFields.map((key, index) => (
                    <td
                      key={key}
                      className="px-6 py-4 whitespace-nowrap"
                      style={{ width: columnWidths[index] || 150, maxWidth: columnWidths[index] || 150 }}
                    >
                      {biologicalStructure[componentType]?.properties[key]?.type === 'string' &&
                      key === 'Size' ? (
                        <select
                          value={component[key]}
                          onChange={(e) => handleFieldChange(component.id, key, e.target.value)}
                          className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                        >
                          {biologicalStructure[componentType]?.properties[key]?.enum?.map((size) => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={biologicalStructure[componentType]?.properties[key]?.type === 'integer' ? 'number' : 'text'}
                          value={component[key]}
                          onChange={(e) => handleFieldChange(component.id, key, e.target.value)}
                          className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                          step={biologicalStructure[componentType]?.properties[key]?.type === 'integer' ? 1 : undefined}
                          style={key === 'Sequence' ? { textTransform: 'uppercase' } : {}}
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" style={{ width: '120px', minWidth: '120px' }}>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(component); }}
                        className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-200"
                        title="Edit"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(component.id); }}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"
                        title="Delete"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDuplicate(component); }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200"
                        title="Duplicate"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
        <button
          onClick={resetColumnWidths}
          className="p-4 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 shadow-lg transition-colors duration-200"
          title="Reset Column Widths"
        >
          <RefreshCw className="w-6 h-6" />
        </button>
        <button
          onClick={handleExport}
          className="p-4 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-lg transition-colors duration-200"
          title="Export JSON"
          disabled={isImporting}
        >
          <Download className="w-6 h-6" />
        </button>
        <label 
          className={`p-4 rounded-full ${
            isImporting ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 cursor-pointer'
          } text-white shadow-lg transition-colors duration-200 flex items-center justify-center`} 
          title="Import JSON"
        >
          <Upload className="w-6 h-6" />
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
            disabled={isImporting}
            ref={importInputRef}
          />
        </label>
        <button
          onClick={() => setIsFormOpen(true)}
          className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-colors duration-200"
          title="Add New Component"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>

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