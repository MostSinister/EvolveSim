import React from 'react';
import { ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';

const ZoomControl = ({ zoomLevel, setZoomLevel, isDarkMode }) => {
  const buttonClass = `p-2 rounded-full transition-colors duration-200 ${
    isDarkMode 
      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
  }`;

  const handleZoomIn = () => setZoomLevel(Math.min(200, zoomLevel + 10));
  const handleZoomOut = () => setZoomLevel(Math.max(10, zoomLevel - 10));
  const handleResetZoom = () => setZoomLevel(100);
  const handleFitToScreen = () => {
    // Implement fit to screen logic here
    console.log('Fit to screen');
  };

  return (
    <div className={`flex items-center space-x-4 p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      {/* Zoom Out Button */}
      <button onClick={handleZoomOut} className={buttonClass} title="Zoom Out">
        <ZoomOut size={20} />
      </button>

      {/* Zoom Level Display and Control */}
      <div className="flex items-center space-x-2">
        <input
          type="range"
          min="10"
          max="200"
          value={zoomLevel}
          onChange={(e) => setZoomLevel(Number(e.target.value))}
          className={`w-24 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
        />
        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {zoomLevel}%
        </span>
      </div>

      {/* Zoom In Button */}
      <button onClick={handleZoomIn} className={buttonClass} title="Zoom In">
        <ZoomIn size={20} />
      </button>

      {/* Reset Zoom Button */}
      <button onClick={handleResetZoom} className={buttonClass} title="Reset Zoom">
        <Maximize size={20} />
      </button>

      {/* Fit to Screen Button */}
      <button onClick={handleFitToScreen} className={buttonClass} title="Fit to Screen">
        <Minimize size={20} />
      </button>
    </div>
  );
};

export default ZoomControl;
