// src/components/simulationviewer.js
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import SimulationControls from './simulationcontrols';
import ZoomControl from './zoomcontrol';
import DesignerPanel from './designerpanel';
import ResultsPanel from './resultspanel';
import GridBackground from './GridBackground';

// MovablePanel component for creating draggable and resizable panels
const MovablePanel = ({ children, title, initialState, isDarkMode, onStateChange }) => {
  const [state, setState] = useState(initialState);
  const [isDragging, setIsDragging] = useState(false);

  // Handle mouse down event for dragging
  const handleMouseDown = (event) => {
    const startX = event.clientX - state.position.x;
    const startY = event.clientY - state.position.y;
    setIsDragging(true);

    const handleMouseMove = (event) => {
      const newPosition = {
        x: event.clientX - startX,
        y: event.clientY - startY
      };
      const newState = { ...state, position: newPosition };
      setState(newState);
      onStateChange(newState);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle panel resize
  const onResize = (event, { size }) => {
    const newState = { ...state, size };
    setState(newState);
    onStateChange(newState);
  };

  return (
    <Resizable
      width={state.size.width}
      height={state.size.height}
      onResize={onResize}
      draggableOpts={{ grid: [25, 25] }}
    >
      <div
        className={`absolute rounded-lg shadow-lg overflow-hidden ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
        } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} bg-opacity-80`}
        style={{
          left: `${state.position.x}px`,
          top: `${state.position.y}px`,
          width: `${state.size.width}px`,
          height: `${state.size.height}px`,
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

// Main SimulationViewer component
const SimulationViewer = ({ isDarkMode }) => {
  // State for zoom level and panel positions
  const [zoomLevel, setZoomLevel] = useState(1);
  const [designerPanelState, setDesignerPanelState] = useState(() => {
    const saved = localStorage.getItem('designerPanelState');
    return saved ? JSON.parse(saved) : { position: { x: 20, y: 60 }, size: { width: 300, height: 400 } };
  });
  const [resultsPanelState, setResultsPanelState] = useState(() => {
    const saved = localStorage.getItem('resultsPanelState');
    return saved ? JSON.parse(saved) : { position: { x: 340, y: 60 }, size: { width: 300, height: 400 } };
  });
  const containerRef = useRef(null);

  // Save panel states to localStorage
  useEffect(() => {
    localStorage.setItem('designerPanelState', JSON.stringify(designerPanelState));
  }, [designerPanelState]);

  useEffect(() => {
    localStorage.setItem('resultsPanelState', JSON.stringify(resultsPanelState));
  }, [resultsPanelState]);

  // Handle zoom change
  const handleZoomChange = useCallback((newZoomLevel) => {
    setZoomLevel(Math.min(Math.max(newZoomLevel, 0.1), 5));
  }, []);

  // Handle wheel event for zooming
  const handleWheel = useCallback((event) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1; // Zoom out (0.9) or in (1.1)
      setZoomLevel((prevZoom) => {
        const newZoom = prevZoom * zoomFactor;
        return Math.min(Math.max(newZoom, 0.1), 5);
      });
    }
  }, []);

  // Add wheel event listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col h-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <div className="flex-grow relative overflow-hidden">
        <GridBackground zoomLevel={zoomLevel} />
        <div className="absolute top-4 right-4 z-10">
          <ZoomControl 
            isDarkMode={isDarkMode} 
            onZoomChange={handleZoomChange}
            zoomLevel={zoomLevel}
          />
        </div>
        <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}>
          <MovablePanel 
            title="Designer Panel" 
            initialState={designerPanelState}
            isDarkMode={isDarkMode}
            onStateChange={setDesignerPanelState}
          >
            <DesignerPanel isDarkMode={isDarkMode} />
          </MovablePanel>
          <MovablePanel 
            title="Results Panel" 
            initialState={resultsPanelState}
            isDarkMode={isDarkMode}
            onStateChange={setResultsPanelState}
          >
            <ResultsPanel isDarkMode={isDarkMode} />
          </MovablePanel>
        </div>
      </div>
      <div className="p-4">
        <SimulationControls isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default SimulationViewer;
