// src/components/simulationviewer.js
import React, { useState, useEffect, useCallback } from 'react';
import SimulationControls from './simulationcontrols';
import ZoomControl from './zoomcontrol';
import DesignerPanel from './designerpanel';
import ResultsPanel from './resultspanel';
import ResizablePanels from './resizablepanels';
import GridBackground from './GridBackground';

const MovableElement = ({ children, initialPosition, anchorPoint }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event) => {
    const startX = event.pageX - position.x;
    const startY = event.pageY - position.y;
    setIsDragging(true);

    const handleMouseMove = (event) => {
      setPosition({
        x: event.pageX - startX,
        y: event.pageY - startY
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

  return (
    <div
      style={{
        position: 'absolute',
        ...anchorPoint,
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      className={`no-select ${isDragging ? 'dragging' : ''}`}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

const SimulationViewer = ({ isDarkMode }) => {
  const [viewerSize, setViewerSize] = useState({ width: 0, height: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const viewerRef = React.useRef(null);

  useEffect(() => {
    const updateSize = () => {
      if (viewerRef.current) {
        setViewerSize({
          width: viewerRef.current.offsetWidth,
          height: viewerRef.current.offsetHeight
        });
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel(prevZoom => Math.min(prevZoom * 1.2, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prevZoom => Math.max(prevZoom / 1.2, 0.5));
  }, []);

  return (
    <div ref={viewerRef} className="flex flex-col h-full relative">
      <GridBackground zoomLevel={zoomLevel} />
      <style jsx global>{`
        .no-select {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .dragging {
          pointer-events: none;
        }
      `}</style>
      <MovableElement 
        initialPosition={{ x: 0, y: 0 }} 
        anchorPoint={{ top: '20px', right: '20px' }}
      >
        <ZoomControl 
          isDarkMode={isDarkMode} 
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          zoomLevel={zoomLevel}
        />
      </MovableElement>
      <MovableElement 
        initialPosition={{ x: -150, y: -20 }} 
        anchorPoint={{ bottom: '20px', left: '50%' }}
      >
        <SimulationControls isDarkMode={isDarkMode} />
      </MovableElement>
      <div className="flex-grow">
        <ResizablePanels>
          <DesignerPanel isDarkMode={isDarkMode} />
          <ResultsPanel isDarkMode={isDarkMode} />
        </ResizablePanels>
      </div>
    </div>
  );
};

export default SimulationViewer;
