import React from 'react';
import Lottie from 'lottie-react';
import { X } from 'lucide-react';

const FullScreenOrganism = ({ organism, isDarkMode, onClose }) => {
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';

  // Safely access numeric properties and provide default values
  const fitness = organism.fitness !== undefined ? organism.fitness.toFixed(2) : 'N/A';
  const health = organism.health !== undefined ? organism.health : 'N/A';
  const energy = organism.energy !== undefined ? organism.energy : 'N/A';
  const intelligence = organism.intelligence !== undefined ? organism.intelligence : 'N/A';

  return (
    <div className={`fixed inset-0 ${bgColor} ${textColor} p-8 z-50 overflow-auto`}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl"
      >
        <X />
      </button>
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-4xl font-bold mb-4 ${organism.textColor}`}>{organism.name}</h2>
        <h3 className="text-2xl mb-8">{organism.title}</h3>
        <div className="flex justify-between items-start mb-8">
          <div className="w-1/2">
            <p>Fitness: {fitness}</p>
            <p>Health: {health}%</p>
            <p>Energy: {energy}%</p>
            <p>Intelligence: {intelligence}%</p>
          </div>
          <div className="w-1/2">
            <Lottie animationData={organism.animationData} loop={true} />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Simulate
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Edit Organism
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullScreenOrganism;
