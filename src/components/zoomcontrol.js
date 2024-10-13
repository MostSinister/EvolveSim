import React from 'react';
import { ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';

const ZoomControl = ({ zoomLevel, setZoomLevel, isDarkMode }) => {
  const buttonClass = `p-3 rounded-full transition-colors duration-200 shadow-md ${
    isDarkMode 
      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
  }`;

  const handleZoomIn = () => setZoomLevel(Math.min(200, zoomLevel + 10));
  const handleZoomOut = () => setZoomLevel(Math.max(10, zoomLevel - 10));
  const handleResetZoom = () => setZoomLevel(100);
  const handleFitToScreen = () => {
    console.log('Fit to screen');
  };

  return (
    <div className={`flex flex-col items-center space-y-4 py-8 px-6 rounded-3xl bg-transparent shadow-lg`}>      
      {/* Zoom In Button */}
      <button onClick={handleZoomIn} className={buttonClass} title="Zoom In">
        <ZoomIn size={24} />
      </button>

      {/* Zoom Level Display and Control */}
      <div className="flex flex-col items-center mt-4">
        <input
          type="range"
          min="10"
          max="200"
          value={zoomLevel}
          onChange={(e) => setZoomLevel(Number(e.target.value))}
          className={`h-40 w-2 appearance-none rounded-full focus:outline-none ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}
          style={{ writingMode: 'bt-lr' }}
        />
        <span className={`text-sm font-semibold mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {zoomLevel}%
        </span>
      </div>

      {/* Zoom Out Button */}
      <button onClick={handleZoomOut} className={buttonClass} title="Zoom Out">
        <ZoomOut size={24} />
      </button>

      <div className="flex flex-col space-y-4 mt-4">
        {/* Reset Zoom Button */}
        <button onClick={handleResetZoom} className={buttonClass} title="Reset Zoom">
          <Maximize size={24} />
        </button>

        {/* Fit to Screen Button */}
        <button onClick={handleFitToScreen} className={buttonClass} title="Fit to Screen">
          <Minimize size={24} />
        </button>
      </div>
    </div>
  );
};

export default ZoomControl;
