import React from 'react';
import { Button } from './button';
import { Slider } from './slider';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const ZoomControl = ({ zoomLevel, setZoomLevel, isDarkMode }) => (
  <div className={`flex items-center space-x-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-full shadow-lg p-2`}>
    <Button variant="ghost" size="icon" onClick={() => setZoomLevel(Math.max(0, zoomLevel - 10))}>
      <ZoomOut className="h-4 w-4" />
    </Button>
    <Slider
      value={[zoomLevel]}
      onValueChange={(value) => setZoomLevel(value[0])}
      max={100}
      step={1}
      className="w-32"
    />
    <Button variant="ghost" size="icon" onClick={() => setZoomLevel(Math.min(100, zoomLevel + 10))}>
      <ZoomIn className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon" onClick={() => setZoomLevel(50)}>
      <RotateCcw className="h-4 w-4" />
    </Button>
  </div>
);

export default ZoomControl;
