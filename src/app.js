import React, { useState } from 'react';
import SidebarLayout from './components/sidebar/sidebarlayout'; // Sidebar layout component
import SimulationViewer from './components/simulationviewer'; // Simulation viewer component
import Dashboard from './components/Dashboard'; // Dashboard component
import Results from './components/Results'; // Results component
import Settings from './components/Settings'; // Settings component
import Save from './components/Save'; // Save component
import Logs from './components/Logs'; // Logs component
import Organism from './components/Organism'; // Organism component

const App = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('dashboard');
  // State to manage sidebar collapse
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Function to render the correct content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard isDarkMode={isDarkMode} />;
      case 'simulation':
        return <SimulationViewer isDarkMode={isDarkMode} />;
      case 'organism':
        return <Organism isDarkMode={isDarkMode} />;
      case 'results':
        return <Results isDarkMode={isDarkMode} />;
      case 'settings':
        return <Settings isDarkMode={isDarkMode} />;
      case 'save':
        return <Save isDarkMode={isDarkMode} />;
      case 'logs':
        return <Logs isDarkMode={isDarkMode} />;
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
        toggleDarkMode={toggleDarkMode} // Pass the toggleDarkMode function
      />
      <main className={`flex-1 flex flex-col overflow-hidden ${activeTab === 'simulation' ? 'p-0' : 'p-4'}`}>
        {renderContent()} {/* Render the correct tab content */}
      </main>
    </div>
  );
};

export default App;
