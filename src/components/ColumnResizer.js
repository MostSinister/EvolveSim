import React from 'react';

function ColumnResizer({ index, startColumnResize, columnWidths, setColumnWidths }) {
  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    startColumnResize(index, e.clientX);
  };

  return (
    <div
      className="absolute top-0 right-0 bottom-0 w-1 cursor-col-resize bg-gray-300 dark:bg-gray-600 hover:bg-blue-500 dark:hover:bg-blue-400"
      onMouseDown={handleMouseDown}
    />
  );
}

export default ColumnResizer;