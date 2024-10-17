import React from 'react';
import { Dna, Heart, Zap, Brain } from 'lucide-react';

const OrganismDetails = ({ organism, isDarkMode }) => {
  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-300';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';

  if (!organism) {
    return (
      <div className={`${cardBgColor} p-4 rounded-lg shadow-lg border ${borderColor} h-full flex items-center justify-center`}>
        <p className="text-center text-gray-500">Select an organism to view details</p>
      </div>
    );
  }

  return (
    <div className={`${cardBgColor} p-4 rounded-lg shadow-lg border ${borderColor} h-full`}>
      <h3 className="text-xl font-semibold mb-4">{organism.name} Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Dna className={`w-6 h-6 ${textColor}`} />
          <span>Fitness: {organism.fitness.toFixed(2)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Heart className={`w-6 h-6 ${textColor}`} />
          <span>Health: {organism.health}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className={`w-6 h-6 ${textColor}`} />
          <span>Energy: {organism.energy}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className={`w-6 h-6 ${textColor}`} />
          <span>Intelligence: {organism.intelligence}%</span>
        </div>
      </div>
    </div>
  );
};

export default OrganismDetails;
