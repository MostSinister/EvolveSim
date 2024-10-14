import React from 'react';

const GridBackground = ({ zoomLevel }) => {
  const gridSize = 20 * zoomLevel; // Adjust base grid size as needed

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div
        className="w-full h-full"
        style={{
          backgroundColor: '#1e3a8a', // Dark blue background
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
    </div>
  );
};

export default GridBackground;
