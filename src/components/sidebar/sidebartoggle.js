// SidebarToggle.js
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SidebarToggle = ({ isCollapsed, toggleSidebar, isDarkMode }) => {
  return (
    <button
      onClick={toggleSidebar}
      className={`p-1 rounded-full transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gray-700 hover:bg-gray-600'
          : 'bg-gray-100 hover:bg-gray-200'
      } absolute right-0 top-1/2 transform -translate-y-1/2`}
    >
      {isCollapsed ? (
        <ChevronRight className={`h-4 w-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
      ) : (
        <ChevronLeft className={`h-4 w-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
      )}
    </button>
  );
};

export default SidebarToggle;
