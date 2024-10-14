// SidebarLayout.js
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Icons for toggle
import SidebarItems from './sidebaritems'; // Breakout menu items component

const SidebarLayout = ({ isCollapsed, toggleSidebar, activeTab, setActiveTab, isDarkMode, toggleDarkMode }) => {
  const sidebarWidth = isCollapsed ? '60px' : '256px'; // Adjusted the collapsed panel width

  return (
    <aside
      className={`shadow-md flex flex-col justify-between h-screen transition-all duration-500 ease-in-out ${
        isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
      }`}
      style={{ width: sidebarWidth, overflow: 'hidden' }}
    >
      <div className={`flex items-center h-16 relative ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <h1
          className={`font-extrabold text-xl font-sans transition-opacity duration-300 ease-in-out ${
            isCollapsed ? 'opacity-0' : 'opacity-100'
          } ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}
          style={{ flexGrow: isCollapsed ? 0 : 1, marginLeft: '10px' }} // Added margin-left
        >
          EvolveSim
        </h1>
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-full transition-transform transform hover:scale-105 absolute right-4 top-1/2 -translate-y-1/2 ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      {/* Sidebar Menu */}
      <div className="flex-grow">
        <SidebarItems
          isCollapsed={isCollapsed}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Footer with Night Mode Toggle */}
      <div className="p-4 flex items-center justify-between relative">
        <span
          className={`text-sm transition-opacity duration-300 ease-in-out ${
            isCollapsed ? 'opacity-0' : 'opacity-100'
          } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          style={{ flexGrow: isCollapsed ? 0 : 1 }}
        >
          Night Mode
        </span>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full transition-colors duration-300 ease-in-out absolute right-2 top-1/2 -translate-y-1/2"
        >
          {isDarkMode ? (
            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 000 16c4.418 0 8-3.582 8-8 0-4.418-3.582-8-8-8z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 1a9 9 0 100 18A9 9 0 0010 1z" />
            </svg>
          )}
        </button>
      </div>
    </aside>
  );
};

export default SidebarLayout;
