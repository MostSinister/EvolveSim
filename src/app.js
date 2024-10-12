import React, { useState } from 'react';
import SidebarLayout from './components/sidebar/sidebarlayout'; // Updated import path for Sidebar
import SimulationViewer from './components/simulationviewer';
import Dashboard from './components/Dashboard';
import Results from './components/Results';
import Settings from './components/Settings';
import Save from './components/Save';
import Logs from './components/Logs';
import Organism from './components/Organism';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to render correct content
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard isDarkMode={isDarkMode} />;
      case 'simulation':
        return <SimulationViewer isDarkMode={isDarkMode} />;
      case 'organism':
        return <Organism />;
      case 'results':
        return <Results />;
      case 'settings':
        return <Settings />;
      case 'save':
        return <Save />;
      case 'logs':
        return <Logs />;
      default:
        return <Dashboard isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
      <SidebarLayout
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      <main className={`flex-1 flex flex-col overflow-hidden ${activeTab === 'simulation' ? 'p-0' : 'p-4'}`}>
        {renderContent()} {/* Render the correct tab content */}
      </main>
    </div>
  );
};

export default App;
