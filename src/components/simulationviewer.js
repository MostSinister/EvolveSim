// src/components/simulationviewer.js
import React, { useState } from 'react';
import SimulationControls from './simulationcontrols'; // Corrected import for SimulationControls
import ZoomControl from './zoomcontrol'; // Corrected import for ZoomControl
import DesignerPanel from './designerpanel';
import ResultsPanel from './resultspanel';
import ResizablePanels from './resizablepanels';

const SimulationViewer = ({ isDarkMode }) => {
  // State to manage play/pause status
  const [isPlaying, setIsPlaying] = useState(false);
  // State to manage simulation speed
  const [simulationSpeed, setSimulationSpeed] = useState(50);
  // State to manage zoom level
  const [zoomLevel, setZoomLevel] = useState(100);

  // Toggle play/pause state
  const togglePlay = () => setIsPlaying(!isPlaying);

  // Reset simulation logic
  const resetSimulation = () => {
    console.log('Resetting simulation');
  };

  // Configuration for resizable panels
  const panelConfig = [
    {
      component: <DesignerPanel isDarkMode={isDarkMode} />,
      defaultSize: 25,
      minSize: 15,
    },
    {
      component: (
        <div className={`h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4`}>
          {/* Placeholder for simulation canvas */}
          <div 
            className={`w-full h-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded flex items-center justify-center`}
            style={{ transform: `scale(${zoomLevel / 100})`, transition: 'transform 0.3s ease' }}
          >
            <span className="text-2xl font-bold">Simulation View</span>
          </div>
        </div>
      ),
      defaultSize: 50,
      minSize: 30,
    },
    {
      component: <ResultsPanel isDarkMode={isDarkMode} />,
      defaultSize: 25,
      minSize: 15,
    },
  ];

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
      {/* Simulation Controls */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <SimulationControls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          simulationSpeed={simulationSpeed}
          setSimulationSpeed={setSimulationSpeed}
          resetSimulation={resetSimulation}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10">
        <ZoomControl
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-hidden">
        <ResizablePanels isDarkMode={isDarkMode}>
          {panelConfig.map((panel, index) => (
            <ResizablePanels.Panel
              key={index}
              defaultSize={panel.defaultSize}
              minSize={panel.minSize}
            >
              {panel.component}
            </ResizablePanels.Panel>
          ))}
        </ResizablePanels>
      </div>
    </div>
  );
};

export default SimulationViewer;
