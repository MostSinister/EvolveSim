// src/components/ui/slider.js
import React from 'react';

export const Slider = ({ value, onChange, min = 0, max = 100, step = 1 }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full cursor-pointer"
    />
  );
};
