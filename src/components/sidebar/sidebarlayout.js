// SidebarLayout.js
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Icons for toggle
import SidebarItems from './sidebaritems'; // Breakout menu items component
import UserAvatar from '../UserAvatar';

// SidebarLayout component definition
const SidebarLayout = ({ 
  activeTab, 
  setActiveTab, 
  isDarkMode, 
  toggleDarkMode, 
  user, 
  handleLogout 
}) => {
  // State to manage whether the sidebar is collapsed
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    return savedState !== null ? JSON.parse(savedState) : false;
  });

  // Determine sidebar width based on collapse state
  const sidebarWidth = isCollapsed ? '60px' : '256px'; // Adjusted the collapsed panel width

  // Effect to save the collapse state to local storage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  // Function to toggle the sidebar collapse state
  const handleToggleSidebar = () => {
    setIsCollapsed(prevState => !prevState);
  };

  // Render the sidebar layout
  return (
    <aside
      className={`shadow-md flex flex-col justify-between h-screen transition-all duration-500 ease-in-out ${
        isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
      }`}
      style={{ width: sidebarWidth, overflow: 'hidden' }}
    >
      {/* Header with title and toggle button */}
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
          onClick={handleToggleSidebar}
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

      {/* Footer with Night Mode Toggle and User Status */}
      <div className="p-4 flex flex-col">
        <div className={`flex items-center justify-center mb-4 ${isCollapsed ? 'flex-col' : 'justify-between'}`}>
          {!isCollapsed && (
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Night Mode
            </span>
          )}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors duration-300 ease-in-out ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
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
        
        {/* User Status */}
        {!isCollapsed && (
          <div className="transition-opacity duration-300 ease-in-out">
            <h2 className="text-sm font-semibold mb-2">User Status</h2>
            {user ? (
              <div className="flex items-center">
                <UserAvatar user={user} />
                <div className="ml-3">
                  <p className="text-sm">{user.displayName || user.email}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm">Not logged in</p>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default SidebarLayout;
