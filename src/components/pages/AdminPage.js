import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PlusCircle, RefreshCw, Download, Upload } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { subscribeToCollection, deleteDocument, updateDocument, addDocument, exportCollectionToJSON, importCollectionFromJSON } from '../../firebaseService';
import NewComponentForm from '../Admin/NewComponentForm';
import EditComponentForm from '../Admin/EditComponentForm';
import biologicalStructure from '../../Data/biological_components_structure.json';
import componentCategories from '../../Data/ComponentCategories.json';
import { getFieldType, getStructure } from '../../utils/structureParser';
import ComponentTypeSelector from '../Admin/ComponentTypeSelector';
import ComponentTable from '../Admin/ComponentTable';
import ActionButtons from '../Admin/ActionButtons';

// Function to format fields based on their type
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

// Main component function
function AdminPage({ isDarkMode }) {
  const [componentType, setComponentType] = useState(() => {
    // Retrieve the last selected component type from localStorage
    return localStorage.getItem('lastComponentType') || 'Cells';
  });
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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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
    const savedWidths = localStorage.getItem(`columnWidths_${componentType}`);
    if (savedWidths) {
      setColumnWidths(JSON.parse(savedWidths));
    } else {
      const defaultWidths = {};
      orderedFields.forEach((field, index) => {
        defaultWidths[index] = 150; // Default width of 150px
      });
      setColumnWidths(defaultWidths);
    }
  }, [componentType]);

  // Save the selected component type to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('lastComponentType', componentType);
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

  const resetColumnWidths = useCallback(() => {
    const table = tableRef.current;
    if (!table) return;

    const newWidths = {};
    const headerCells = table.querySelectorAll('thead th');
    
    headerCells.forEach((cell, index) => {
      if (index < orderedFields.length) {
        cell.style.width = 'auto';
        const contentWidth = cell.offsetWidth;
        newWidths[index] = Math.max(100, contentWidth);
        cell.style.width = `${newWidths[index]}px`;
      }
    });

    setColumnWidths(newWidths);
    localStorage.setItem(`columnWidths_${componentType}`, JSON.stringify(newWidths));
  }, [componentType, orderedFields.length]);

  const sortedComponents = React.useMemo(() => {
    let sortableItems = [...components];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [components, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={`p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen`}>
      <ToastContainer />
      <ComponentTypeSelector
        componentType={componentType}
        setComponentType={setComponentType}
        biologicalStructure={biologicalStructure}
      />
      {loading ? (
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading...</p>
      ) : components.length === 0 ? (
        <p className="text-xl text-gray-700 dark:text-gray-300">No components found.</p>
      ) : (
        <div className="h-[calc(100vh-300px)] overflow-hidden"> {/* Add this wrapper div */}
          <ComponentTable
            components={sortedComponents}
            orderedFields={orderedFields}
            columnWidths={columnWidths}
            setColumnWidths={setColumnWidths}
            handleFieldChange={handleFieldChange}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleDuplicate={handleDuplicate}
            requestSort={requestSort}
            sortConfig={sortConfig}
            isDarkMode={isDarkMode}
            tableRef={tableRef}
            resizing={resizing}
            setResizing={setResizing}
            biologicalStructure={biologicalStructure}
            componentType={componentType}
            componentCategories={componentCategories}
          />
        </div>
      )}
      <div className="flex justify-end space-x-4 mt-4"> {/* Flexbox container for horizontal alignment */}
        <ActionButtons
          resetColumnWidths={resetColumnWidths}
          handleExport={handleExport}
          handleImport={handleImport}
          setIsFormOpen={setIsFormOpen}
          isImporting={isImporting}
          importInputRef={importInputRef}
        />
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
