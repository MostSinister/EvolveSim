import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './global.css'; // Import global styles
import SidebarLayout from './components/sidebar/sidebarlayout'; // Sidebar layout component
import SimulationViewer from './components/simulationviewer'; // Simulation viewer component
import Dashboard from './components/Dashboard'; // Dashboard component
import Results from './components/Results'; // Results component
import Settings from './components/Settings'; // Settings component
import Save from './components/Save'; // Save component
import Logs from './components/Logs'; // Logs component
import Organism from './components/Organism'; // Organism component
import AdminPage from './components/AdminPage'; // Import the AdminPage component

const App = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('dashboard');
  // State to manage sidebar collapse
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <div className={`flex h-screen ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <SidebarLayout
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <main className={`flex-1 flex flex-col overflow-hidden ${activeTab === 'simulation' ? 'p-0' : 'p-4'}`}>
          <Routes>
            <Route path="/" element={<Dashboard isDarkMode={isDarkMode} />} />
            <Route path="/simulation" element={<SimulationViewer isDarkMode={isDarkMode} />} />
            <Route path="/organism" element={<Organism isDarkMode={isDarkMode} />} />
            <Route path="/results" element={<Results isDarkMode={isDarkMode} />} />
            <Route path="/settings" element={<Settings isDarkMode={isDarkMode} />} />
            <Route path="/save" element={<Save isDarkMode={isDarkMode} />} />
            <Route path="/logs" element={<Logs isDarkMode={isDarkMode} />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
