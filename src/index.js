import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app'; // Ensure the App component is correctly imported
import './index.css'; // Ensure you are importing the CSS for Tailwind

// Ensure the root element exists in your HTML file
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found');
}
