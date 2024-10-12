// SidebarToggle.js
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SidebarToggle = ({ isCollapsed, toggleSidebar }) => {
  return (
    <button
      onClick={toggleSidebar}
      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 absolute right-0 top-1/2 transform -translate-y-1/2"
    >
      {isCollapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </button>
  );
};

export default SidebarToggle;
