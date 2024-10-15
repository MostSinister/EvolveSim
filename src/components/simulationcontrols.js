import React from 'react';

const SimulationControls = ({ isDarkMode }) => {
  const buttonClass = `px-4 py-2 rounded ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-200`;

  return (
    <div className={`flex justify-center space-x-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg shadow-md`}>
      <button className={buttonClass}>Start</button>
      <button className={buttonClass}>Pause</button>
      <button className={buttonClass}>Reset</button>
    </div>
  );
};

export default SimulationControls;
