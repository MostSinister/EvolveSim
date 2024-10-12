// src/components/simulationviewer.js
import React from 'react';

const SimulationViewer = ({ isDarkMode }) => {
  return (
    <div className={`relative w-full h-full ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
      {/* Simulation Viewer Frame */}
      <div className="absolute inset-0 border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center">
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Full-screen Simulation Area</p>
      </div>

      {/* Simulation and Zoom Controls (floating over the simulation area) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
        <div className="flex items-center space-x-2 bg-white p-3 rounded-full shadow-lg">
          <button className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200">
            <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m-7-3h10" />
            </svg>
          </button>
          <button className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200">
            <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m6-6H6" />
            </svg>
          </button>
          <input
            type="range"
            className="slider mx-2"
            min="0"
            max="100"
            value="50"
          />
        </div>
        <div className="flex items-center space-x-2 bg-white p-3 rounded-full shadow-lg">
          <button className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200">
            <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <input
            type="range"
            className="slider mx-2"
            min="0"
            max="100"
            value="50"
          />
          <button className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200">
            <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20V4m-8 8h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimulationViewer;
