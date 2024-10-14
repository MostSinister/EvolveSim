import React from 'react';

const ResizablePanels = ({ children }) => {
  return (
    <div className="flex h-full">
      <div className="w-1/2 overflow-auto">{children[0]}</div>
      <div className="w-1/2 overflow-auto">{children[1]}</div>
    </div>
  );
};

export default ResizablePanels;
