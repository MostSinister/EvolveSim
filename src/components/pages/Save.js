import React, { useState } from 'react';
import { Save as SaveIcon, Download, Upload } from 'lucide-react';

const Save = ({ isDarkMode }) => {
  const [saveName, setSaveName] = useState('');

  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const buttonClass = `px-4 py-2 rounded-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`;

  const handleSave = () => {
    console.log(`Saving simulation as: ${saveName}`);
    // Implement save logic here
  };

  const handleExport = () => {
    console.log('Exporting simulation data');
    // Implement export logic here
  };

  const handleImport = () => {
    console.log('Importing simulation data');
    // Implement import logic here
  };

  return (
    <div className={`h-full p-6 ${bgColor} ${textColor} transition-colors`}>
      <h2 className="text-2xl font-bold mb-6">Save Simulation</h2>
      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-6 rounded-lg space-y-6 transition-colors`}>
        <div>
          <label htmlFor="saveName" className="block mb-2">Save Name:</label>
          <input
            type="text"
            id="saveName"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'} border ${isDarkMode ? 'border-gray-500' : 'border-gray-300'} transition-colors`}
            placeholder="Enter save name"
          />
        </div>
        <div className="flex space-x-4">
          <button onClick={handleSave} className={buttonClass}>
            <SaveIcon className="w-5 h-5 mr-2 inline" />
            Save Simulation
          </button>
          <button onClick={handleExport} className={buttonClass}>
            <Download className="w-5 h-5 mr-2 inline" />
            Export Data
          </button>
          <button onClick={handleImport} className={buttonClass}>
            <Upload className="w-5 h-5 mr-2 inline" />
            Import Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Save;
