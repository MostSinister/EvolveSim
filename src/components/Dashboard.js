// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { fetchCollection } from '../firebaseService'; // Import the fetchCollection function

const Card = ({ title, value, color, isDarkMode }) => (
  <div className={`shadow-md rounded-lg p-4 transition-transform transform hover:scale-102 duration-300 ease-out ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{title}</h3>
    <p className={`text-4xl font-bold ${color}`}>{value}</p>
  </div>
);

const Dashboard = ({ isDarkMode }) => {
  const [counts, setCounts] = useState({
    Cells: 0,
    Synapses: 0,
    Genes: 0,
    Neurons: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cells = await fetchCollection('Cells');
        const synapses = await fetchCollection('Synapses');
        const genes = await fetchCollection('Genes');
        const neurons = await fetchCollection('Neurons');

        setCounts({
          Cells: cells.length,
          Synapses: synapses.length,
          Genes: genes.length,
          Neurons: neurons.length,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

      <div className="grid grid-cols-2 gap-6 mt-6">
        <Card title="Cells" value={counts.Cells} color="text-indigo-600" isDarkMode={isDarkMode} />
        <Card title="Synapses" value={counts.Synapses} color="text-green-500" isDarkMode={isDarkMode} />
        <Card title="Genes" value={counts.Genes} color="text-red-500" isDarkMode={isDarkMode} />
        <Card title="Neurons" value={counts.Neurons} color="text-yellow-500" isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Dashboard;
