import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore instance
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import NewComponentForm from './NewComponentForm'; // Import the new component form
import EditComponentForm from './EditComponentForm'; // Import the new edit component form
import { PlusCircle, Trash, Edit3, Clipboard } from 'lucide-react'; // Use icons for better UI

const AdminPage = ({ isDarkMode }) => {
  const [componentType, setComponentType] = useState('Cells');
  const [entries, setEntries] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [sortField, setSortField] = useState('Cell Type Name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentEntry, setCurrentEntry] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, [componentType, sortField, sortOrder]);

  const fetchEntries = async () => {
    try {
      let allEntries = [];
      if (componentType === 'Show All') {
        const types = ['Cells', 'Neurons', 'Synapses', 'Genes'];
        for (const type of types) {
          const querySnapshot = await getDocs(collection(db, type));
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, type, ...doc.data() }));
          allEntries.push(...data);
        }
      } else {
        const querySnapshot = await getDocs(collection(db, componentType));
        allEntries = querySnapshot.docs.map(doc => ({ id: doc.id, type: componentType, ...doc.data() }));
      }
      setEntries(allEntries);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleTypeChange = (e) => {
    setComponentType(e.target.value);
    setEntries([]); // Clear entries to prevent stale data
    setCurrentEntry(null);
  };

  const handleEdit = (entry) => {
    console.log('Editing entry:', entry); // Log the entry being edited
    setCurrentEntry(entry);
    setEditFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this component?')) {
      try {
        await deleteDoc(doc(db, componentType, id));
        fetchEntries(); // Refresh entries after deletion
      } catch (error) {
        console.error('Error deleting component:', error);
      }
    }
  };

  const handleSortChange = (e) => {
    setSortField(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id).then(() => {
      alert('Document ID copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy ID: ', err);
    });
  };

  const sortedEntries = [...entries].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const fieldOrder = {
    Cells: ['Sequence', 'Health', 'Energy Cost', 'Size', 'Armor'],
    Neurons: ['Sequence', 'Behavior', 'Receptor Slots', 'Output Slots'],
    Synapses: ['Sequence', 'Rules (Math Expressions)', 'Expected Attributes', 'Condition Expression', 'Value'],
    Genes: ['Sequence', 'Bonus Type', 'Cell Bonus/Cost (Integer)'],
  };

  return (
    <div className={`h-screen p-6 flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Components</h2>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="text-lg">Component Type:</label>
          <select
            value={componentType}
            onChange={handleTypeChange}
            className="w-40 p-2 border rounded select-component-type bg-white text-gray-800"
          >
            <option value="Cells">Cells</option>
            <option value="Neurons">Neurons</option>
            <option value="Synapses">Synapses</option>
            <option value="Genes">Genes</option>
            <option value="Show All">Show All</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-lg">Sort By:</label>
          <select
            value={sortField}
            onChange={handleSortChange}
            className="p-2 border rounded sort-by bg-white text-gray-800"
          >
            {Object.keys(entries[0] || {}).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
          <button onClick={toggleSortOrder} className={`p-2 border rounded ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>
      <div className={`flex-1 overflow-y-auto p-4 rounded-lg shadow-md transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
        {sortedEntries.length > 0 ? (
          sortedEntries.map((entry, index) => (
            <div
              key={`${entry.id}-${index}`} // Ensure unique key by appending index
              className={`p-4 border-b last:border-b-0 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300 ease-in-out ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
              onClick={() => handleEdit(entry)}
            >
              {componentType === 'Show All' && (
                <span className="font-bold w-1/6 text-center">{entry.type}</span>
              )}
              <span className="font-bold w-1/6 text-center">{entry['Cell Type Name'] || entry['Neuron Type Name'] || entry['Synapse Type Name'] || entry['Gene Type Name']}</span>
              <div className="flex-1 flex justify-between items-center space-x-4">
                <div className="flex flex-col items-center w-1/6">
                  <span className="font-bold">Subcategory</span>
                  <span>{entry['Subcategory']}</span>
                </div>
                {fieldOrder[entry.type].map((key) => (
                  <div key={key} className="flex flex-col items-center w-1/6">
                    <span className="font-bold">{key}</span>
                    <span>{entry[key]}</span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2 items-center">
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyId(entry.id); }}
                  className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-black'}`}
                  aria-label="Copy Document ID"
                >
                  <Clipboard size={16} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleEdit(entry); }} className={`text-blue-500 hover:text-blue-700 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}>
                  <Edit3 size={16} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }} className={`text-red-500 hover:text-red-700 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No components found for {componentType}.</p>
        )}
      </div>

      {/* Floating + Icon */}
      <button
        onClick={() => setFormOpen(true)}
        className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg flex items-center transition-colors duration-300 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
      >
        <PlusCircle size={24} />
        <span className="ml-2">Add Component</span>
      </button>

      {/* New Component Form */}
      <NewComponentForm
        isOpen={isFormOpen}
        onClose={() => setFormOpen(false)}
        componentType={componentType}
        fetchEntries={fetchEntries}
        isDarkMode={isDarkMode}
      />

      {/* Edit Component Form */}
      <EditComponentForm
        isOpen={isEditFormOpen}
        onClose={() => setEditFormOpen(false)}
        componentType={componentType}
        entry={currentEntry}
        fetchEntries={fetchEntries}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default AdminPage;
