// src/components/Dashboard.js
import React, { useState, useEffect, useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { fetchCollection } from '../../firebaseService';
import StatCard from '../Cards/StatCard';
import OrganismCard from '../Cards/OrganismCard';
import MessageCard from '../Cards/MessageCard';
import { cardConfig } from '../../config/cardConfig';
import FullScreenOrganism from '../common/FullScreenOrganism';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = ({ isDarkMode }) => {
  const [counts, setCounts] = useState({
    Cells: 0,
    Synapses: 0,
    Genes: 0,
    Neurons: 0,
  });

  const generateDefaultLayout = useMemo(() => {
    return cardConfig.map((card, index) => ({
      i: card.id,
      x: (index % 3) * 2,
      y: Math.floor(index / 3) * 2,
      w: card.type === 'organism' || card.type === 'message' ? 2 : 2,
      h: card.type === 'organism' || card.type === 'message' ? 2 : 1,
      minW: card.type === 'organism' || card.type === 'message' ? 2 : 1,
      minH: card.type === 'organism' || card.type === 'message' ? 2 : 1,
    }));
  }, []);

  const [layout, setLayout] = useState(generateDefaultLayout);
  const [cards, setCards] = useState(cardConfig);
  const [fullScreenOrganism, setFullScreenOrganism] = useState(null);

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

  useEffect(() => {
    const savedLayout = localStorage.getItem('dashboardLayout');
    if (savedLayout) {
      setLayout(JSON.parse(savedLayout));
    } else {
      setLayout(generateDefaultLayout);
    }
  }, [generateDefaultLayout]);

  const updateCardValues = (newCounts) => {
    setCards(prevCards => prevCards.map(card => ({
      ...card,
      value: card.id in newCounts ? newCounts[card.id] : card.value
    })));
  };

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
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

  if (!layout || layout.length === 0) {
    return <div>Loading...</div>;
  }

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
        {cards.map((card) => (
          <div key={card.id} className="no-select" style={{ overflow: 'hidden' }}>
            {card.type === 'organism' ? (
              <OrganismCard
                organism={card}
                isDarkMode={isDarkMode}
                onClick={handleOrganismClick}
              />
            ) : card.type === 'message' ? (
              <MessageCard isDarkMode={isDarkMode} />
            ) : (
              <StatCard
                title={card.title}
                value={card.value}
                color={card.color}
                isDarkMode={isDarkMode}
              />
            )}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
