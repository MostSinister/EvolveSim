import React from 'react';

const Simulation = ({ isDarkMode }) => {
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';

  return (
    <div className={`shadow rounded-lg p-6 ${bgColor} ${textColor} transition-colors`}>
      <h2 className="text-2xl font-bold mb-4">Simulation</h2>
      <div className="space-y-4">
        <button className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105`}>
          Start Simulation
        </button>
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}>
          <h3 className="text-lg font-semibold">Current Generation</h3>
          <p className="text-3xl font-bold">50</p>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
