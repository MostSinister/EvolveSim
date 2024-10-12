import React from 'react';

const Simulation = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Simulation</h2>
      <div className="space-y-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Start Simulation
        </button>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Current Generation</h3>
          <p className="text-3xl font-bold">50</p>
        </div>
      </div>
    </div>
  );
};

export default Simulation;

