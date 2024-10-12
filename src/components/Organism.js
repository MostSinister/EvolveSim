// src/components/Organism.js
import React, { useState } from 'react';

const Organism = () => {
  const [selectedOrganism, setSelectedOrganism] = useState(null);

  const organisms = [
    { id: 1, name: "Organism A", fitness: 0.82, health: 90, age: 3 },
    { id: 2, name: "Organism B", fitness: 0.65, health: 76, age: 5 },
    { id: 3, name: "Organism C", fitness: 0.92, health: 85, age: 2 },
  ];

  const handleOrganismClick = (organism) => {
    setSelectedOrganism(organism);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Organisms</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* Organism List */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Organism List</h3>
          <ul className="space-y-2">
            {organisms.map((organism) => (
              <li
                key={organism.id}
                className="p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleOrganismClick(organism)}
              >
                {organism.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Organism Details */}
        <div className="col-span-2 bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Organism Details</h3>
          {selectedOrganism ? (
            <div>
              <p className="text-xl font-bold">{selectedOrganism.name}</p>
              <p>Fitness: {selectedOrganism.fitness}</p>
              <p>Health: {selectedOrganism.health}%</p>
              <p>Age: {selectedOrganism.age} years</p>
              {/* Add more organism traits here */}
            </div>
          ) : (
            <p className="text-gray-500">Select an organism to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Organism;
