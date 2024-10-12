import React from 'react';

const Results = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Results</h2>
      <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
        <div className="bg-blue-100 p-4 rounded-lg text-center shadow">
          <h3 className="text-lg font-semibold">Total Organisms</h3>
          <p className="text-3xl font-bold">1000</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center shadow">
          <h3 className="text-lg font-semibold">Average Fitness</h3>
          <p className="text-3xl font-bold">0.75</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center shadow">
          <h3 className="text-lg font-semibold">Most Fit Organism</h3>
          <p className="text-2xl font-bold">Organism X</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center shadow">
          <h3 className="text-lg font-semibold">Survival Rate</h3>
          <p className="text-3xl font-bold">85%</p>
        </div>
      </div>
    </div>
  );
};

export default Results;
