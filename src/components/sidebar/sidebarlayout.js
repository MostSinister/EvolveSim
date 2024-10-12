// SidebarLayout.js
import React from 'react';
import SidebarItems from './sidebaritems'; // Breakout menu items component
import SidebarToggle from './sidebartoggle'; // Breakout toggle logic and arrow button

const SidebarLayout = ({ isCollapsed, toggleSidebar, activeTab, setActiveTab, isDarkMode, toggleDarkMode }) => {
  return (
    <aside
      className="bg-white shadow-md flex flex-col justify-between h-screen transition-all duration-300"
      style={{ width: isCollapsed ? '64px' : '256px' }}
    >
      <div className="p-4 flex justify-between items-center h-16 relative">
        <SidebarToggle isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        {!isCollapsed && (
          <h1 className="font-extrabold text-xl font-sans text-gray-800">EvolveSim</h1>
        )}
      </div>
      
      {/* Sidebar Menu */}
      <SidebarItems
        isCollapsed={isCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Footer with Night Mode Toggle */}
      <div className={`p-4 ${isCollapsed ? 'hidden' : 'block'}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm">Night Mode</span>
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
