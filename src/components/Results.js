import React, { useState } from 'react';

const Results = ({ isDarkMode }) => {
  const [selectedSimulation, setSelectedSimulation] = useState(null);

  // Expanded sample data for simulation history
  const simulationHistory = [
    {
      id: 1,
      date: '2024-10-11',
      result: 'Win',
      duration: '15m',
      generations: 10,
      kills: 5,
      casualties: 2,
    },
    {
      id: 2,
      date: '2024-10-10',
      result: 'Loss',
      duration: '20m',
      generations: 8,
      kills: 3,
      casualties: 4,
    },
    {
      id: 3,
      date: '2024-10-09',
      result: 'Win',
      duration: '18m',
      generations: 12,
      kills: 6,
      casualties: 1,
    },
    {
      id: 4,
      date: '2024-10-08',
      result: 'Loss',
      duration: '22m',
      generations: 9,
      kills: 2,
      casualties: 5,
    },
    {
      id: 5,
      date: '2024-10-07',
      result: 'Win',
      duration: '25m',
      generations: 15,
      kills: 8,
      casualties: 3,
    },
    {
      id: 6,
      date: '2024-10-06',
      result: 'Loss',
      duration: '30m',
      generations: 11,
      kills: 4,
      casualties: 6,
    },
    {
      id: 7,
      date: '2024-10-05',
      result: 'Win',
      duration: '20m',
      generations: 14,
      kills: 7,
      casualties: 2,
    },
    {
      id: 8,
      date: '2024-10-04',
      result: 'Loss',
      duration: '19m',
      generations: 10,
      kills: 3,
      casualties: 4,
    },
    {
      id: 9,
      date: '2024-10-03',
      result: 'Win',
      duration: '17m',
      generations: 13,
      kills: 6,
      casualties: 1,
    },
    {
      id: 10,
      date: '2024-10-02',
      result: 'Loss',
      duration: '21m',
      generations: 8,
      kills: 2,
      casualties: 5,
    },
    // Additional sample data to fill the screen
    {
      id: 11,
      date: '2024-10-01',
      result: 'Win',
      duration: '16m',
      generations: 11,
      kills: 5,
      casualties: 3,
    },
    {
      id: 12,
      date: '2024-09-30',
      result: 'Loss',
      duration: '24m',
      generations: 10,
      kills: 4,
      casualties: 5,
    },
    {
      id: 13,
      date: '2024-09-29',
      result: 'Win',
      duration: '19m',
      generations: 13,
      kills: 7,
      casualties: 2,
    },
    {
      id: 14,
      date: '2024-09-28',
      result: 'Loss',
      duration: '23m',
      generations: 9,
      kills: 3,
      casualties: 6,
    },
    {
      id: 15,
      date: '2024-09-27',
      result: 'Win',
      duration: '22m',
      generations: 14,
      kills: 8,
      casualties: 1,
    },
    {
      id: 16,
      date: '2024-09-26',
      result: 'Loss',
      duration: '18m',
      generations: 12,
      kills: 4,
      casualties: 5,
    },
    {
      id: 17,
      date: '2024-09-25',
      result: 'Win',
      duration: '21m',
      generations: 15,
      kills: 9,
      casualties: 2,
    },
    {
      id: 18,
      date: '2024-09-24',
      result: 'Loss',
      duration: '20m',
      generations: 11,
      kills: 3,
      casualties: 4,
    },
    {
      id: 19,
      date: '2024-09-23',
      result: 'Win',
      duration: '17m',
      generations: 13,
      kills: 6,
      casualties: 1,
    },
    {
      id: 20,
      date: '2024-09-22',
      result: 'Loss',
      duration: '25m',
      generations: 8,
      kills: 2,
      casualties: 5,
    },
    // Add more sample data as needed
  ];

  const totalSimulations = simulationHistory.length;
  const totalWins = simulationHistory.filter(sim => sim.result === 'Win').length;
  const totalGenerations = simulationHistory.reduce((acc, sim) => acc + sim.generations, 0);

  const handleSimulationClick = (simulation) => {
    setSelectedSimulation(simulation);
  };

  const closePopup = () => {
    setSelectedSimulation(null);
  };

  return (
    <div className={`flex flex-col items-center justify-center h-full p-12 shadow-md rounded-lg transition-colors ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h2 className="text-2xl font-bold mb-12">Results</h2>

      <div className="grid grid-cols-3 gap-8 w-full max-w-3xl mb-12">
        <div className={`p-6 rounded-lg text-center shadow transition-transform transform hover:scale-105 ${isDarkMode ? 'bg-gray-200' : 'bg-blue-100'}`}>
          <h3 className="text-lg font-semibold text-black">Total Simulations</h3>
          <p className="text-3xl font-bold text-black">{totalSimulations}</p>
        </div>
        <div className={`p-6 rounded-lg text-center shadow transition-transform transform hover:scale-105 ${isDarkMode ? 'bg-gray-200' : 'bg-green-100'}`}>
          <h3 className="text-lg font-semibold text-black">Total Wins</h3>
          <p className="text-3xl font-bold text-black">{totalWins}</p>
        </div>
        <div className={`p-6 rounded-lg text-center shadow transition-transform transform hover:scale-105 ${isDarkMode ? 'bg-gray-200' : 'bg-yellow-100'}`}>
          <h3 className="text-lg font-semibold text-black">Total Generations</h3>
          <p className="text-3xl font-bold text-black">{totalGenerations}</p>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto space-y-2 w-full">
        {simulationHistory.map((simulation) => (
          <div
            key={simulation.id}
            className={`flex justify-between items-center p-2 rounded-lg shadow cursor-pointer transition-transform transform hover:scale-y-105 ${
              simulation.result === 'Win'
                ? isDarkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-200 hover:bg-green-300'
                : isDarkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-200 hover:bg-red-300'
            }`}
            onClick={() => handleSimulationClick(simulation)}
          >
            <span className="font-semibold">{simulation.date}</span>
            <span className="font-semibold">{simulation.result}</span>
            <span className="text-sm">Duration: {simulation.duration}</span>
            <span className="text-sm">Generations: {simulation.generations}</span>
            <span className="text-sm">Kills: {simulation.kills}</span>
            <span className="text-sm">Casualties: {simulation.casualties}</span>
          </div>
        ))}
      </div>

      {selectedSimulation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className={`p-6 rounded-lg shadow-lg w-1/3 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
            <h2 className="text-2xl font-bold mb-4">Simulation Details</h2>
            <p>Date: {selectedSimulation.date}</p>
            <p>Result: {selectedSimulation.result}</p>
            <p>Duration: {selectedSimulation.duration}</p>
            <p>Generations: {selectedSimulation.generations}</p>
            <p>Kills: {selectedSimulation.kills}</p>
            <p>Casualties: {selectedSimulation.casualties}</p>
            <button onClick={closePopup} className="mt-4 text-red-500">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
