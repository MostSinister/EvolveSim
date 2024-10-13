// SidebarLayout.js
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Icons for toggle
import SidebarItems from './sidebaritems'; // Breakout menu items component
import SidebarToggle from './sidebartoggle'; // Breakout toggle logic and arrow button

const SidebarLayout = ({ isCollapsed, toggleSidebar, activeTab, setActiveTab, isDarkMode, toggleDarkMode }) => {
  const sidebarWidth = isCollapsed ? '64px' : '256px'; // Adjust width based on collapse state
  const toggleButtonPosition = isCollapsed ? 'justify-center' : 'justify-end'; // Center when collapsed

  return (
    <aside
      className={`shadow-md flex flex-col justify-between h-screen transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
      }`}
      style={{ width: sidebarWidth }}
    >
      <div className={`p-4 flex ${toggleButtonPosition} items-center h-16 relative ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        {!isCollapsed && (
          <h1 className={`font-extrabold text-xl font-sans mr-4 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>EvolveSim</h1>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-full transition-transform transform hover:scale-105 ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          } ${isCollapsed ? '' : 'mr-4'}`} // Add margin-right when expanded
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
      <div className={`p-4 ${isCollapsed ? 'hidden' : 'block'}`}>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Night Mode</span>
          <button onClick={toggleDarkMode}>
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
      </div>
    </aside>
  );
};

export default SidebarLayout;
