import React, { useRef, useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const OrganismCard = ({ isDarkMode, animationData, name, description, textColor = 'green' }) => {
  const cardRef = useRef(null);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      if (cardRef.current) {
        const { width, height } = cardRef.current.getBoundingClientRect();
        setIsWide(width > height);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`
        shadow-md rounded-lg p-2 
        ${isDarkMode ? 'bg-gray-700' : 'bg-white'} 
        h-full flex ${isWide ? 'flex-row' : 'flex-col'} 
        no-select transition-all duration-300 ease-in-out 
        hover:scale-105 hover:shadow-lg
      `}
    >
      <div className={`flex items-center justify-center ${isWide ? 'w-1/2' : 'w-full h-3/4'}`}>
        <Lottie 
          animationData={animationData} 
          loop={true}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <div className={`
        ${isWide ? 'w-1/2 pl-2 flex flex-col justify-center' : 'mt-auto'} 
        ${isWide ? 'text-left' : 'text-center'}
      `}>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
        <p className={`text-sm font-bold text-${textColor}-${isDarkMode ? '400' : '600'}`}>{name}</p>
      </div>
    </div>
  );
};

export default OrganismCard;
