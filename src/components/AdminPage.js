import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import Firestore instance
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import NewComponentForm from './NewComponentForm'; // Import the new component form
import EditComponentForm from './EditComponentForm'; // Import the new edit component form

const AdminPage = () => {
  const [componentType, setComponentType] = useState('Cells');
  const [entries, setEntries] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentDocId, setCurrentDocId] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false); // State to manage form visibility
  const [isEditFormOpen, setEditFormOpen] = useState(false); // State to manage edit form visibility
  const [sortField, setSortField] = useState('Cell Type Name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentEntry, setCurrentEntry] = useState(null); // State to hold the current entry being edited

  useEffect(() => {
    fetchEntries();
  }, [componentType]);

  const fetchEntries = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, componentType));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setComponentType(type);
    setEditMode(false);
    setCurrentDocId(null);
  };

  const handleEdit = (entry) => {
    setEditMode(true);
    setCurrentDocId(entry.id);
    setCurrentEntry(entry);
    setEditFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, componentType, id));
      fetchEntries();
    } catch (error) {
      console.error('Error deleting component:', error);
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
    <div className="h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Manage Components</h2>
      <div className="mb-4">
        <label className="block mb-2">Select Component Type</label>
        <select
          value={componentType}
          onChange={handleTypeChange}
          className="w-full p-2 border rounded"
        >
          <option value="Cells">Cells</option>
          <option value="Neurons">Neurons</option>
          <option value="Synapses">Synapses</option>
          <option value="Genes">Genes</option>
        </select>
      </div>
      <div className="mb-4 flex items-center space-x-4">
        <label className="block">Sort By:</label>
        <select
          value={sortField}
          onChange={handleSortChange}
          className="p-2 border rounded"
        >
          {Object.keys(entries[0] || {}).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <button onClick={toggleSortOrder} className="p-2 border rounded bg-blue-500 text-white">
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sortedEntries.length > 0 ? (
          sortedEntries.map((entry) => (
            <div key={entry.id} className="p-4 border rounded shadow hover:shadow-lg transition-shadow flex items-center justify-between mb-4">
              <span className="font-bold w-1/6 text-center">{entry['Cell Type Name'] || entry['Neuron Type Name'] || entry['Synapse Type Name'] || entry['Gene Type Name']}</span>
              <div className="flex-1 flex justify-between items-center space-x-4">
                <div className="flex flex-col items-center w-1/6">
                  <span className="font-bold">Subcategory</span>
                  <span>{entry['Subcategory']}</span>
                </div>
                {fieldOrder[componentType].map((key) => (
                  <div key={key} className="flex flex-col items-center w-1/6">
                    <span className="font-bold">{key}</span>
                    <span>{entry[key]}</span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2 items-center">
                <button
                  onClick={() => handleCopyId(entry.id)}
                  className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 text-black"
                  aria-label="Copy Document ID"
                >
                  !
                </button>
                <button onClick={() => handleEdit(entry)} className="text-blue-500 hover:text-blue-700">Edit</button>
                <button onClick={() => handleDelete(entry.id)} className="text-red-500 hover:text-red-700">Delete</button>
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
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg"
      >
        +
      </button>

      {/* New Component Form */}
      <NewComponentForm
        isOpen={isFormOpen}
        onClose={() => setFormOpen(false)}
        componentType={componentType}
        fetchEntries={fetchEntries}
      />

      {/* Edit Component Form */}
      <EditComponentForm
        isOpen={isEditFormOpen}
        onClose={() => setEditFormOpen(false)}
        componentType={componentType}
        entry={currentEntry}
        fetchEntries={fetchEntries}
      />
    </div>
  );
};

export default AdminPage;
