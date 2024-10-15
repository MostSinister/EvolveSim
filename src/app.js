// src/App.js

// This is the root component of the application. It handles user authentication,
// routing, and renders either the main application or the login page based on the user's auth state.

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { handleRedirectResult } from './utils/auth';
import MainApp from './pages/MainApp';
import LoginPage from './components/LoginPage';

function App() {
  // State to store the current user
  const [user, setUser] = useState(null);
  // State to manage loading state while checking authentication
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up an observer for changes to the user's sign-in state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Handle any pending redirect results (e.g., after OAuth sign-in)
    handleRedirectResult();

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" replace /> : <LoginPage />} 
        />
        {/* All other routes */}
        <Route 
          path="/*" 
          element={user ? <MainApp user={user} handleLogout={handleLogout} /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
