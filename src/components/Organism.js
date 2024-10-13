// src/components/Organism.js
import React, { useState } from 'react';
import { Dna, Heart, Zap, Brain } from 'lucide-react';

const Organism = ({ isDarkMode }) => {
  const [selectedOrganism, setSelectedOrganism] = useState(null);

  const organisms = [
    { id: 1, name: "Organism A", fitness: 0.82, health: 90, energy: 75, intelligence: 60 },
    { id: 2, name: "Organism B", fitness: 0.65, health: 76, energy: 80, intelligence: 55 },
    { id: 3, name: "Organism C", fitness: 0.92, health: 85, energy: 70, intelligence: 75 },
  ];

  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const hoverColor = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-300';

  return (
    <div className={`h-full p-6 ${bgColor} ${textColor}`}>
      <h2 className="text-3xl font-bold mb-6">Organism Viewer</h2>
      <div className="flex space-x-6">
        <div className={`w-1/3 ${cardBgColor} p-4 rounded-lg shadow-lg border ${borderColor}`}>
          <h3 className="text-xl font-semibold mb-4">Organism List</h3>
          <ul className="space-y-2">
            {organisms.map((org) => (
              <li 
                key={org.id} 
                className={`p-2 rounded cursor-pointer ${
                  selectedOrganism === org 
                    ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800') 
                    : ''
                } ${hoverColor}`}
                onClick={() => setSelectedOrganism(org)}
              >
                {org.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={`w-2/3 ${cardBgColor} p-4 rounded-lg shadow-lg border ${borderColor}`}>
          {selectedOrganism ? (
            <>
              <h3 className="text-xl font-semibold mb-4">{selectedOrganism.name} Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Dna className={`w-6 h-6 ${textColor}`} />
                  <span>Fitness: {selectedOrganism.fitness.toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className={`w-6 h-6 ${textColor}`} />
                  <span>Health: {selectedOrganism.health}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className={`w-6 h-6 ${textColor}`} />
                  <span>Energy: {selectedOrganism.energy}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className={`w-6 h-6 ${textColor}`} />
                  <span>Intelligence: {selectedOrganism.intelligence}%</span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Select an organism to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Organism;
