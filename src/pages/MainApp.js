import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SidebarLayout from '../components/sidebar/sidebarlayout';
import SimulationViewer from '../components/simulationviewer';
import Dashboard from '../components/Dashboard';
import Results from '../components/Results';
import Settings from '../components/Settings';
import Save from '../components/Save';
import Logs from '../components/Logs';
import Organism from '../components/Organism';
import AdminPage from '../components/AdminPage';

const MainApp = ({ user, handleLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
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
      <main className="flex-1 flex flex-col overflow-hidden p-4 relative">
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
