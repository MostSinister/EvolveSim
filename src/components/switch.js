// src/components/ui/switch.js
import React from 'react';

export const Switch = ({ checked, onCheckedChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
        />
        <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
            checked ? 'transform translate-x-4 bg-blue-500' : ''
          }`}
        ></div>
      </div>
    </label>
  );
};
