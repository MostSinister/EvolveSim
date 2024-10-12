import React from 'react';
import { Slider } from './slider';

const DesignerPanel = ({ isDarkMode }) => (
  <div className="space-y-4">
    {["Speed", "Strength", "Intelligence", "Health"].map((trait) => (
      <div key={trait} className="flex items-center space-x-4">
        <span className="w-24">{trait}:</span>
        <Slider defaultValue={[50]} max={100} step={1} className="flex-1" />
      </div>
    ))}
  </div>
);

export default DesignerPanel;
