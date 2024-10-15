import React from 'react';
import { signInWithGoogle } from '../utils/auth';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
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
