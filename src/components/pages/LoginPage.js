import React from 'react';
import { signInWithGoogle } from '../../utils/auth';
// Update the path below to the correct location of petrydish.jpg
import backgroundImage from '../../assets/Images/petrydish.jpg';

const LoginPage = () => {
  return (
    <div 
      className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Welcome to EvolveSim</h1>
        <button 
          onClick={signInWithGoogle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
