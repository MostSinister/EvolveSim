import React from 'react';

const ZoomControl = ({ isDarkMode, onZoomChange, zoomLevel }) => {
  const handleZoomIn = () => onZoomChange(Math.min(zoomLevel * 1.2, 2));
  const handleZoomOut = () => onZoomChange(Math.max(zoomLevel / 1.2, 0.5));

  const buttonClass = `p-2 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-200`;

  return (
    <div className={`flex items-center space-x-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-2 rounded-lg shadow-md`}>
      <button onClick={handleZoomOut} className={buttonClass}>-</button>
      <span className="w-16 text-center">{Math.round(zoomLevel * 100)}%</span>
      <button onClick={handleZoomIn} className={buttonClass}>+</button>
    </div>
  );
};

export default ZoomControl;
