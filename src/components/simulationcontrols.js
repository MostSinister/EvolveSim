import React from 'react';
import { Button } from './button';
import { Slider } from './slider';
import { Play, Pause, FastForward } from 'lucide-react';

const SimulationControls = ({ isPlaying, togglePlay, simulationSpeed, setSimulationSpeed, isDarkMode }) => (
  <div className={`flex items-center space-x-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-full shadow-lg p-2`}>
    <Button variant="ghost" size="icon" onClick={togglePlay}>
      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
    </Button>
    <Button variant="ghost" size="icon">
      <FastForward className="h-4 w-4" />
    </Button>
    <Slider
      value={[simulationSpeed]}
      onValueChange={(value) => setSimulationSpeed(value[0])}
      max={100}
      step={1}
      className="w-32"
    />
  </div>
);

export default SimulationControls;
