// SidebarItems.js
import React from 'react';
import { Home, Edit, Dna, BarChart2, Save, Settings, FileText } from 'lucide-react';

const SidebarItems = ({ isCollapsed, activeTab, setActiveTab }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: Edit, label: 'Simulation', id: 'simulation' },
    { icon: Dna, label: 'Organism', id: 'organism' },
    { icon: BarChart2, label: 'Results', id: 'results' },
    { icon: Save, label: 'Save', id: 'save' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: FileText, label: 'Logs', id: 'logs' },
  ];

  return (
    <nav className="mt-2 flex-1 overflow-y-auto space-y-1">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex items-center p-2 w-full text-left transition-all duration-300 ${
            activeTab === item.id
              ? 'bg-gray-200 text-blue-600'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <div className="ml-4">
            <item.icon className="h-6 w-6" />
          </div>
          {!isCollapsed && (
            <span className="ml-4 text-sm">{item.label}</span>
          )}
        </button>
      ))}
    </nav>
  );
};

export default SidebarItems;
