import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = ({ isDarkMode, isLoggedIn }) => {
  return (
    <div className={`p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      {isLoggedIn ? (
        <p>Welcome, Admin!</p>
      ) : (
        <p>Please log in to access admin features.</p>
      )}
      <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
    </div>
  );
};

export default AdminPage;
