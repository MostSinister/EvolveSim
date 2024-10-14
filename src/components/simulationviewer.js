// src/components/simulationviewer.js
import React, { useState, useCallback } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import SimulationControls from './simulationcontrols';
import ZoomControl from './zoomcontrol';
import DesignerPanel from './designerpanel';
import ResultsPanel from './resultspanel';
import GridBackground from './GridBackground';

const MovablePanel = ({ children, title, initialPosition, isDarkMode }) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({ width: 300, height: 400 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event) => {
    const startX = event.clientX - position.x;
    const startY = event.clientY - position.y;
    setIsDragging(true);

    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX - startX,
        y: event.clientY - startY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const onResize = (event, { size }) => {
    setSize({ width: size.width, height: size.height });
  };

  return (
    <Resizable
      width={size.width}
      height={size.height}
      onResize={onResize}
      draggableOpts={{ grid: [25, 25] }}
    >
      <div
        className={`absolute rounded-lg shadow-lg overflow-hidden ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
        } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} bg-opacity-80`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
      >
        <div
          className={`p-2 font-bold ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}
          onMouseDown={handleMouseDown}
        >
          {title}
        </div>
        <div className="p-4 h-full overflow-auto">{children}</div>
      </div>
    </Resizable>
  );
};

const SimulationViewer = ({ isDarkMode }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomChange = useCallback((newZoomLevel) => {
    setZoomLevel(newZoomLevel);
  }, []);

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex-grow relative overflow-hidden">
        <GridBackground zoomLevel={zoomLevel} />
        <div className="absolute top-4 right-4 z-10">
          <ZoomControl 
            isDarkMode={isDarkMode} 
            onZoomChange={handleZoomChange}
            zoomLevel={zoomLevel}
          />
        </div>
        <MovablePanel title="Designer Panel" initialPosition={{ x: 20, y: 60 }} isDarkMode={isDarkMode}>
          <DesignerPanel isDarkMode={isDarkMode} />
        </MovablePanel>
        <MovablePanel title="Results Panel" initialPosition={{ x: 340, y: 60 }} isDarkMode={isDarkMode}>
          <ResultsPanel isDarkMode={isDarkMode} />
        </MovablePanel>
      </div>
      <div className="p-4">
        <SimulationControls isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default SimulationViewer;
