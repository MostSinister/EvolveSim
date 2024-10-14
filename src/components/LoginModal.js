import React from 'react';

const LoginModal = ({ isOpen, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4 text-gray-800">Login</h2>
      <button
        onClick={onLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginModal;
