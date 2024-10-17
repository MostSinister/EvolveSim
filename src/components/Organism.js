// src/components/Organism.js
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import OrganismCard from './Cards/OrganismCard';
import OrganismDetails from './OrganismDetails';
import CreateOrganismCard from './CreateOrganismCard';
import FullScreenOrganism from './FullScreenOrganism';
import bacteriaAnimation1 from '../assets/anims/Bacteria1-lottie.json';
import bacteriaAnimation2 from '../assets/anims/Bacteria2-lottie.json';
import bacteriaAnimation3 from '../assets/anims/Bacteria3-lottie.json';

const Organism = ({ isDarkMode }) => {
  const [organisms, setOrganisms] = useState([
    { id: 1, name: "Blobulus Wigglius", title: "The Blob", fitness: 0.82, health: 90, energy: 75, intelligence: 60, animationData: bacteriaAnimation1, textColor: 'text-green-500' },
    { id: 2, name: "Squigglius Jigglypuff", title: "The Squiggler", fitness: 0.65, health: 76, energy: 80, intelligence: 55, animationData: bacteriaAnimation2, textColor: 'text-blue-500' },
    { id: 3, name: "Wobbletonium Giganticulus", title: "The Wobbler", fitness: 0.92, health: 85, energy: 70, intelligence: 75, animationData: bacteriaAnimation3, textColor: 'text-purple-500' },
  ]);
  const [selectedOrganism, setSelectedOrganism] = useState(organisms[0]);
  const [fullScreenOrganism, setFullScreenOrganism] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('organismOrder');
    if (savedOrder) {
      setOrganisms(JSON.parse(savedOrder));
    }
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(organisms);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOrganisms(items);
    localStorage.setItem('organismOrder', JSON.stringify(items));
  };

  const handleOrganismHover = (organism) => {
    setSelectedOrganism(organism);
  };

  const handleOrganismClick = (organism) => {
    setFullScreenOrganism(organism);
  };

  if (fullScreenOrganism) {
    return (
      <FullScreenOrganism
        organism={fullScreenOrganism}
        isDarkMode={isDarkMode}
        onClose={() => setFullScreenOrganism(null)}
      />
    );
  }

  return (
    <div className="flex h-full">
      <div className="w-1/3 p-4 overflow-y-auto">
        <CreateOrganismCard isDarkMode={isDarkMode} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="organisms">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {organisms.map((organism, index) => (
                  <Draggable key={organism.id} draggableId={organism.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <OrganismCard
                          organism={organism}
                          isDarkMode={isDarkMode}
                          onClick={handleOrganismClick}
                          onHover={handleOrganismHover}
                          isDraggable={true}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="w-2/3 p-4">
        <OrganismDetails organism={selectedOrganism} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Organism;
