// SidebarItems.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Home, Edit, Dna, BarChart2, Save, Settings, FileText, User, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const SidebarItems = ({ isCollapsed, activeTab, setActiveTab, isDarkMode }) => {
  const [menuItems, setMenuItems] = React.useState([
    { icon: Home, label: 'Dashboard', id: 'dashboard', path: '/' },
    { icon: Edit, label: 'Simulation', id: 'simulation', path: '/simulation' },
    { icon: Dna, label: 'Organism', id: 'organism', path: '/organism' },
    { icon: BarChart2, label: 'Results', id: 'results', path: '/results' },
    { icon: Save, label: 'Save', id: 'save', path: '/save' },
    { icon: Settings, label: 'Settings', id: 'settings', path: '/settings' },
    { icon: FileText, label: 'Logs', id: 'logs', path: '/logs' },
    { icon: User, label: 'Admin', id: 'admin', path: '/admin' },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(menuItems);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    setMenuItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sidebar-items">
        {(provided) => (
          <nav
            className="mt-2 flex-1 overflow-y-auto overflow-x-hidden space-y-1"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {menuItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="group"
                  >
                    <Link to={item.path} onClick={() => setActiveTab(item.id)}>
                      <button
                        className={`flex items-center p-2 w-full text-left transition-all duration-300 ${
                          activeTab === item.id
                            ? isDarkMode
                              ? 'bg-gray-700 text-blue-400'
                              : 'bg-gray-200 text-blue-600'
                            : isDarkMode
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <div className={`ml-1 ${isCollapsed ? 'mx-auto' : ''}`}>
                          <item.icon
                            className={`h-6 w-6 ${
                              activeTab === item.id
                                ? 'text-blue-500'
                                : isDarkMode
                                ? 'text-gray-400'
                                : 'text-gray-500'
                            }`}
                          />
                        </div>
                        {!isCollapsed && (
                          <span className="ml-2 text-sm">{item.label}</span>
                        )}
                        <div className="ml-auto mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <GripVertical className="h-4 w-4 text-gray-500" />
                        </div>
                      </button>
                    </Link>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </nav>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SidebarItems;
