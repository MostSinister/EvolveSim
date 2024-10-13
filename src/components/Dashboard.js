// src/components/Dashboard.js
import React from 'react';

const Card = ({ title, value, color, isDarkMode }) => (
  <div className={`shadow-md rounded-lg p-4 transition-transform transform hover:scale-102 duration-300 ease-out ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{title}</h3>
    <p className={`text-4xl font-bold ${color}`}>{value}</p>
  </div>
);

const Dashboard = ({ isDarkMode }) => {
  // Sample data for dashboard display
  const totalOrganisms = 1000;
  const averageFitness = 0.75;
  const totalGenerations = 25;
  const simulationStatus = "Running";

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Total Organisms" value={totalOrganisms} color="text-indigo-600" isDarkMode={isDarkMode} />
        <Card title="Average Fitness" value={averageFitness} color="text-green-500" isDarkMode={isDarkMode} />
        <Card title="Total Generations" value={totalGenerations} color="text-red-500" isDarkMode={isDarkMode} />
        <div className={`col-span-3 shadow-md rounded-lg p-4 mt-4 transition-transform transform hover:scale-102 duration-300 ease-out ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Simulation Status</h3>
          <p className={`text-2xl font-bold ${simulationStatus === "Running" ? "text-green-500" : "text-red-500"}`}>
            {simulationStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
