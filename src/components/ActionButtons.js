import React from 'react';
import { PlusCircle, RefreshCw, Download, Upload } from 'lucide-react';

function ActionButtons({
  resetColumnWidths,
  handleExport,
  handleImport,
  setIsFormOpen,
  isImporting,
  importInputRef
}) {
  const buttonClasses = "shadow-md hover:shadow-lg transition-shadow duration-300 text-white rounded-full p-2 flex items-center justify-center";

  return (
    <div className="flex space-x-4">
      <button
        onClick={resetColumnWidths}
        className={`${buttonClasses} bg-blue-500 hover:bg-blue-600`}
        title="Reset column widths"
      >
        <RefreshCw size={24} />
      </button>
      <button
        onClick={handleExport}
        className={`${buttonClasses} bg-green-500 hover:bg-green-600`}
        title="Export data"
      >
        <Download size={24} />
      </button>
      <label className={`${buttonClasses} bg-yellow-500 hover:bg-yellow-600 cursor-pointer`}>
        <input
          type="file"
          ref={importInputRef}
          onChange={handleImport}
          style={{ display: 'none' }}
          accept=".json"
        />
        {isImporting ? (
          <RefreshCw size={24} className="animate-spin" />
        ) : (
          <Upload size={24} />
        )}
      </label>
      <button
        onClick={() => setIsFormOpen(true)}
        className={`${buttonClasses} bg-purple-500 hover:bg-purple-600`}
        title="Add new component"
      >
        <PlusCircle size={24} />
      </button>
    </div>
  );
}

export default ActionButtons;
