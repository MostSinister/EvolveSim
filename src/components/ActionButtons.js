import React from 'react';
import { PlusCircle, RefreshCw, Download, Upload } from 'lucide-react';

function ActionButtons({ resetColumnWidths, handleExport, handleImport, setIsFormOpen, isImporting, importInputRef }) {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
      <button
        onClick={resetColumnWidths}
        className="p-4 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 shadow-lg transition-colors duration-200"
        title="Reset Column Widths"
      >
        <RefreshCw className="w-6 h-6" />
      </button>
      <button
        onClick={handleExport}
        className="p-4 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-lg transition-colors duration-200"
        title="Export JSON"
        disabled={isImporting}
      >
        <Download className="w-6 h-6" />
      </button>
      <label 
        className={`p-4 rounded-full ${
          isImporting ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 cursor-pointer'
        } text-white shadow-lg transition-colors duration-200 flex items-center justify-center`} 
        title="Import JSON"
      >
        <Upload className="w-6 h-6" />
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
          disabled={isImporting}
          ref={importInputRef}
        />
      </label>
      <button
        onClick={() => setIsFormOpen(true)}
        className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-colors duration-200"
        title="Add New Component"
      >
        <PlusCircle className="w-6 h-6" />
      </button>
    </div>
  );
}

export default ActionButtons;