// MainApp.js
// This component serves as the main container for the application after user login.
// It manages the overall layout, including the sidebar and main content area.

import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SidebarLayout from '../components/sidebar/sidebarlayout';
import SimulationViewer from '../components/pages/simulationviewer';
import Dashboard from '../components/pages/Dashboard';
import Results from '../components/pages/Results';
import Settings from '../components/pages/Settings';
import Save from '../components/pages/Save';
import Logs from '../components/pages/Logs';
import Organism from '../components/pages/Organism';
import AdminPage from '../components/pages/AdminPage';

const MainApp = ({ user, handleLogout }) => {
  // State for managing the active tab in the sidebar
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // State for managing the sidebar's collapsed state
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Initialize dark mode state from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('isDarkMode')) || false;
  });

  // Function to toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('isDarkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    // Main container with dynamic styling based on dark mode
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Sidebar component with various props for state management */}
      <SidebarLayout
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        user={user}
        handleLogout={handleLogout}
      />
      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden p-4 relative">
        {/* Routes for different pages/components */}
        <Routes>
          <Route path="/" element={<Dashboard isDarkMode={isDarkMode} />} />
          <Route path="/simulation" element={<SimulationViewer isDarkMode={isDarkMode} />} />
          <Route path="/organism" element={<Organism isDarkMode={isDarkMode} />} />
          <Route path="/results" element={<Results isDarkMode={isDarkMode} />} />
          <Route path="/settings" element={<Settings isDarkMode={isDarkMode} />} />
          <Route path="/save" element={<Save isDarkMode={isDarkMode} />} />
          <Route path="/logs" element={<Logs isDarkMode={isDarkMode} />} />
          <Route path="/admin" element={<AdminPage isDarkMode={isDarkMode} isLoggedIn={true} />} />
        </Routes>
      </main>
    </div>
  );
};

export default MainApp;
