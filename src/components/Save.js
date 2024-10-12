import React from 'react';

const Save = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Save Simulation</h2>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow">
        Save Simulation State
      </button>
    </div>
  );
};

export default Save;
