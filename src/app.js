// src/App.js

// This is the root component of the application. It handles user authentication,
// routing, and renders either the main application or the login page based on the user's auth state.

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainApp from './pages/MainApp';
import LoginPage from './components/pages/LoginPage'; // Corrected path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;
