import React from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react'; // Icons for controls

const SimulationControls = ({ isPlaying, togglePlay, simulationSpeed, setSimulationSpeed, resetSimulation, isDarkMode }) => {
  // Class for button styling based on dark mode
  const buttonClass = `p-2 rounded-full transition-transform transform hover:scale-105 ${
    isDarkMode 
      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
  }`;

  return (
    <div className={`flex items-center space-x-4 p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      {/* Play/Pause Button */}
      <button onClick={togglePlay} className={buttonClass} aria-label={isPlaying ? "Pause" : "Play"}>
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* Speed Control */}
      <div className="flex items-center space-x-2">
        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Speed:</span>
        <input
          type="range"
          min="1"
          max="100"
          value={simulationSpeed}
          onChange={(e) => setSimulationSpeed(Number(e.target.value))}
          className={`w-24 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
          aria-label="Simulation Speed"
        />
        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {simulationSpeed}x
        </span>
      </div>

      {/* Step Forward Button */}
      <button className={buttonClass} title="Step Forward" aria-label="Step Forward">
        <SkipForward size={20} />
      </button>

      {/* Reset Button */}
      <button onClick={resetSimulation} className={buttonClass} title="Reset Simulation" aria-label="Reset Simulation">
        <RotateCcw size={20} />
      </button>
    </div>
  );
};

export default SimulationControls;
