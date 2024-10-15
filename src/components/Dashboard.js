// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { fetchCollection } from '../firebaseService';
import StatCard from './StatCard';
import OrganismCard from './OrganismCard';
import OrganismInfoCard from './OrganismInfoCard';
import { cardConfig } from '../config/cardConfig';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = ({ isDarkMode }) => {
  const [counts, setCounts] = useState({
    Cells: 0,
    Synapses: 0,
    Genes: 0,
    Neurons: 0,
  });

  const [layout, setLayout] = useState(() => {
    const savedLayout = localStorage.getItem('dashboardLayout');
    return savedLayout ? JSON.parse(savedLayout) : generateDefaultLayout();
  });

  const [cards, setCards] = useState(() => {
    return cardConfig.map(card => ({
      ...card,
      value: card.id in counts ? counts[card.id] : card.value
    }));
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cells = await fetchCollection('Cells');
        const synapses = await fetchCollection('Synapses');
        const genes = await fetchCollection('Genes');
        const neurons = await fetchCollection('Neurons');

        const newCounts = {
          Cells: cells.length,
          Synapses: synapses.length,
          Genes: genes.length,
          Neurons: neurons.length,
        };

        setCounts(newCounts);
        updateCardValues(newCounts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateCardValues = (newCounts) => {
    setCards(prevCards => prevCards.map(card => ({
      ...card,
      value: card.id in newCounts ? newCounts[card.id] : card.value
    })));
  };

  function generateDefaultLayout() {
    return cardConfig.map((card, index) => {
      const isOrganism = card.type === 'organism';
      return {
        i: card.id,
        x: (index % 3) * 2,
        y: Math.floor(index / 3) * 2,
        w: isOrganism ? 4 : 2,
        h: isOrganism ? 3 : 1,
        minW: isOrganism ? 2 : 1,
        minH: isOrganism ? 2 : 1,
      };
    });
  }

  const onLayoutChange = (newLayout) => {
    const updatedLayout = newLayout.map(item => {
      const card = cards.find(c => c.id === item.i);
      const isOrganism = card.type === 'organism';
      return {
        ...item,
        minW: isOrganism ? 2 : 1,
        minH: isOrganism ? 2 : 1,
        w: Math.max(item.w, isOrganism ? 2 : 1),
        h: Math.max(item.h, isOrganism ? 2 : 1),
      };
    });
    setLayout(updatedLayout);
    localStorage.setItem('dashboardLayout', JSON.stringify(updatedLayout));
  };

  return (
    <div className={`p-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <h1 className="text-xl font-bold mb-2">Dashboard</h1>

      <style>{`
        .react-grid-item > .react-resizable-handle::after {
          border-right: 2px solid rgba(0, 0, 0, 0.2);
          border-bottom: 2px solid rgba(0, 0, 0, 0.2);
        }
        .react-grid-item > .react-resizable-handle {
          opacity: 0.5;
          transition: opacity 0.2s ease-in-out;
        }
        .react-grid-item:hover > .react-resizable-handle {
          opacity: 1;
        }
        .no-select {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .react-grid-item {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          display: flex;
          align-items: stretch;
        }
        .react-grid-item > div {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .react-grid-item:hover {
          z-index: 1;
        }
        .text-xxs {
          font-size: 0.625rem;
        }
      `}</style>

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 4, xs: 2, xxs: 1 }}
        rowHeight={80}
        onLayoutChange={onLayoutChange}
        isDraggable={true}
        isResizable={true}
        compactType="vertical"
        preventCollision={false}
        margin={[10, 10]}
      >
        {cards.map((card) => {
          const layoutItem = layout.find(l => l.i === card.id) || {};
          return (
            <div 
              key={card.id} 
              className="no-select" 
              data-grid={{
                ...layoutItem,
                minW: card.type === 'organism' ? 2 : 1,
                minH: card.type === 'organism' ? 2 : 1,
              }}
            >
              {card.type === 'organism' ? (
                card.id === 'Organism3' ? (
                  <OrganismInfoCard
                    isDarkMode={isDarkMode}
                    animationData={card.animationData}
                    name={card.name}
                    description={card.description}
                    textColor={card.textColor}
                    stats={{ Speed: 'Moderate', Size: 'Gigantic', Intelligence: 'Prime' }}
                  />
                ) : (
                  <OrganismCard
                    isDarkMode={isDarkMode}
                    animationData={card.animationData}
                    name={card.name}
                    description={card.description}
                    textColor={card.textColor}
                  />
                )
              ) : (
                <StatCard
                  title={card.title}
                  value={card.value}
                  color={card.color}
                  isDarkMode={isDarkMode}
                />
              )}
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
