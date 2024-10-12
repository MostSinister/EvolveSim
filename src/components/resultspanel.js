import React from 'react';

const ResultsPanel = ({ isDarkMode }) => (
  <div className="grid grid-cols-3 gap-4 text-center">
    {["Time Elapsed", "Organisms Survived", "Notable Events"].map((stat) => (
      <div key={stat} className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded-lg`}>
        <h3 className="font-medium text-sm">{stat}</h3>
        <p className="text-xl font-bold mt-1">0</p>
      </div>
    ))}
  </div>
);

export default ResultsPanel;
