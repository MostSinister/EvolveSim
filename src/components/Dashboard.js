// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { fetchCollection } from '../firebaseService'; // Import the fetchCollection function

const ResponsiveGridLayout = WidthProvider(Responsive);

const Card = ({ title, value, color, isDarkMode }) => (
  <div className={`shadow-md rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} h-full flex flex-col justify-center items-center`}>
    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-center`}>{title}</h3>
    <p className={`text-4xl font-bold ${color} text-center`}>{value}</p>
  </div>
);

const Dashboard = ({ isDarkMode }) => {
  const [counts, setCounts] = useState({
    Cells: 0,
    Synapses: 0,
    Genes: 0,
    Neurons: 0,
  });

  const [layout, setLayout] = useState([
    { i: 'Total Organisms', x: 0, y: 0, w: 2, h: 1 },
    { i: 'Average Fitness', x: 2, y: 0, w: 2, h: 1 },
    { i: 'Total Generations', x: 4, y: 0, w: 2, h: 1 },
    { i: 'Cells', x: 0, y: 1, w: 2, h: 1 },
    { i: 'Synapses', x: 2, y: 1, w: 2, h: 1 },
    { i: 'Genes', x: 4, y: 1, w: 2, h: 1 },
    { i: 'Neurons', x: 0, y: 2, w: 2, h: 1 },
    { i: 'Simulation Status', x: 2, y: 2, w: 4, h: 1 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cells = await fetchCollection('Cells');
        const synapses = await fetchCollection('Synapses');
        const genes = await fetchCollection('Genes');
        const neurons = await fetchCollection('Neurons');

        setCounts({
          Cells: cells.length,
          Synapses: synapses.length,
          Genes: genes.length,
          Neurons: neurons.length,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalOrganisms = 1000;
  const averageFitness = 0.75;
  const totalGenerations = 25;
  const simulationStatus = "Running";

  const cardData = {
    'Total Organisms': { value: totalOrganisms, color: 'text-indigo-600' },
    'Average Fitness': { value: averageFitness, color: 'text-green-500' },
    'Total Generations': { value: totalGenerations, color: 'text-red-500' },
    'Cells': { value: counts.Cells, color: 'text-purple-500' },
    'Synapses': { value: counts.Synapses, color: 'text-yellow-500' },
    'Genes': { value: counts.Genes, color: 'text-blue-500' },
    'Neurons': { value: counts.Neurons, color: 'text-pink-500' },
    'Simulation Status': { value: simulationStatus, color: simulationStatus === "Running" ? "text-green-500" : "text-red-500" },
  };

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  return (
    <div className={`p-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

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
      `}</style>

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 4, xs: 2, xxs: 1 }}
        rowHeight={120}
        onLayoutChange={onLayoutChange}
        isDraggable={true}
        isResizable={true}
        compactType="vertical"
        preventCollision={false}
      >
        {layout.map((item) => (
          <div key={item.i}>
            <Card
              title={item.i}
              value={cardData[item.i].value}
              color={cardData[item.i].color}
              isDarkMode={isDarkMode}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
