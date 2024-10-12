// src/components/Dashboard.js
import React from 'react';

const Dashboard = () => {
  const totalOrganisms = 1000;
  const averageFitness = 0.75;
  const totalGenerations = 25;
  const simulationStatus = "Running";

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
        {/* Card: Total Organisms */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Organisms</h3>
          <p className="text-4xl font-bold text-indigo-600">{totalOrganisms}</p>
        </div>

        {/* Card: Average Fitness */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">Average Fitness</h3>
          <p className="text-4xl font-bold text-green-500">{averageFitness}</p>
        </div>

        {/* Card: Total Generations */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Generations</h3>
          <p className="text-4xl font-bold text-red-500">{totalGenerations}</p>
        </div>

        {/* Card: Simulation Status */}
        <div className="col-span-3 bg-white shadow-md rounded-lg p-4 mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Simulation Status</h3>
          <p className={`text-2xl font-bold ${simulationStatus === "Running" ? "text-green-500" : "text-red-500"}`}>
            {simulationStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
