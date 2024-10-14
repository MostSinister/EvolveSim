import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../utils/auth';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/app');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Welcome to EvolveSim</h1>
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
