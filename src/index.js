// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import app from './app';

// Render the App component to the DOM
const root = createRoot(document.getElementById('root'));
root.render(<app />);
