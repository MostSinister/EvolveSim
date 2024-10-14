import React from 'react';
import LoginModal from './LoginModal';

const LandingPage = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to EvolveSim</h1>
        <LoginModal isOpen={true} onClose={() => {}} onLogin={onLogin} />
      </div>
    </div>
  );
};

export default LandingPage;
