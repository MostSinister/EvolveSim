import React, { useState } from 'react';
import { Slider } from './slider';
import { Plus, Minus, RotateCw, Trash2 } from 'lucide-react';

const DesignerPanel = ({ isDarkMode }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [cellProperties, setCellProperties] = useState({
    speed: 50,
    strength: 50,
    intelligence: 50,
    health: 50,
  });

  const cellTypes = ['Basic', 'Sensor', 'Motor', 'Neural'];

  const handlePropertyChange = (property, value) => {
    setCellProperties(prev => ({ ...prev, [property]: value }));
  };

  const buttonClass = `p-2 rounded-full transition-colors duration-200 ${
    isDarkMode 
      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
  }`;

  return (
    <div className={`h-full p-4 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} rounded-lg shadow-lg`}>
      <h2 className="text-xl font-bold mb-4">Organism Designer</h2>
      
      {/* Cell Type Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Cell Type</h3>
        <div className="grid grid-cols-2 gap-2">
          {cellTypes.map(type => (
            <button
              key={type}
              className={`py-2 px-4 rounded ${
                selectedCell === type
                  ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                  : isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'
              } hover:opacity-80 transition-opacity`}
              onClick={() => setSelectedCell(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Cell Properties */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold">Cell Properties</h3>
        {Object.entries(cellProperties).map(([property, value]) => (
          <div key={property} className="flex items-center space-x-4">
            <span className="w-24 capitalize">{property}:</span>
            <Slider
              value={[value]}
              onValueChange={(newValue) => handlePropertyChange(property, newValue[0])}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="w-8 text-right">{value}</span>
          </div>
        ))}
      </div>

      {/* Designer Controls */}
      <div className="flex justify-between items-center">
        <button className={buttonClass} title="Add Cell">
          <Plus size={20} />
        </button>
        <button className={buttonClass} title="Remove Cell">
          <Minus size={20} />
        </button>
        <button className={buttonClass} title="Rotate Organism">
          <RotateCw size={20} />
        </button>
        <button className={buttonClass} title="Clear Design">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default DesignerPanel;
