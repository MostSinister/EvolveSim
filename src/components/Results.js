import React from 'react';

const Results = ({ isDarkMode }) => {
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';

  return (
    <div className={`flex flex-col items-center justify-center h-full p-4 ${bgColor} ${textColor} shadow-md rounded-lg transition-colors`}>
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Results</h2>
      <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
        <div className={`p-4 rounded-lg text-center shadow ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} transition-colors`}>
          <h3 className={`text-lg font-semibold ${textColor}`}>Total Organisms</h3>
          <p className="text-3xl font-bold">1000</p>
        </div>
        <div className={`p-4 rounded-lg text-center shadow ${isDarkMode ? 'bg-green-900' : 'bg-green-100'} transition-colors`}>
          <h3 className={`text-lg font-semibold ${textColor}`}>Average Fitness</h3>
          <p className="text-3xl font-bold">0.75</p>
        </div>
        <div className={`p-4 rounded-lg text-center shadow ${isDarkMode ? 'bg-yellow-900' : 'bg-yellow-100'} transition-colors`}>
          <h3 className={`text-lg font-semibold ${textColor}`}>Most Fit Organism</h3>
          <p className="text-2xl font-bold">Organism X</p>
        </div>
        <div className={`p-4 rounded-lg text-center shadow ${isDarkMode ? 'bg-red-900' : 'bg-red-100'} transition-colors`}>
          <h3 className={`text-lg font-semibold ${textColor}`}>Survival Rate</h3>
          <p className="text-3xl font-bold">85%</p>
        </div>
      </div>
    </div>
  );
};

export default Results;
