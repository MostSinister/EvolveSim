import React from 'react';
import Lottie from 'lottie-react';
// Update the path below to the correct location of DNAloader.json
import DNAloader from '../../assets/anims/DNAloader.json';

const MessageCard = ({ isDarkMode }) => {
  return (
    <div className={`
      shadow-lg rounded-lg p-4
      ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
      h-full flex flex-col justify-center items-center
      transition-all duration-300 ease-in-out
      hover:scale-105 hover:shadow-xl
    `}>
      <Lottie animationData={DNAloader} loop={true} style={{ width: 100, height: 100 }} />
      <h2 className="text-xl font-bold mb-2 text-center">Welcome To EvolveSim</h2>
      <p className="text-sm text-center">
        This app mutates rapidly, please be patient while EvolveSim is Evolving.
      </p>
    </div>
  );
};

export default MessageCard;
