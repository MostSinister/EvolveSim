import React, { useRef, useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const OrganismInfoCard = ({ isDarkMode, animationData, name, description, textColor = 'green', stats }) => {
  const cardRef = useRef(null);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      if (cardRef.current) {
        const { width, height } = cardRef.current.getBoundingClientRect();
        setIsSmall(width < 250 || height < 250);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`
        shadow-lg rounded-lg p-2 
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
        h-full flex ${isSmall ? 'flex-col' : 'flex-row'} 
        no-select transition-all duration-300 ease-in-out 
        hover:scale-105 hover:shadow-xl
      `}
    >
      <div className={`flex flex-col items-center justify-center ${isSmall ? 'h-1/2' : 'w-1/2'} space-y-2`}>
        <Lottie 
          animationData={animationData} 
          loop={true}
          style={{ width: '80%', height: '80%', objectFit: 'contain' }}
        />
        <p className={`text-${isSmall ? 'xs' : 'sm'} font-semibold text-center text-green-600`}>{name}</p>
      </div>
      <div className={`${isSmall ? 'h-1/2' : 'w-1/2'} flex flex-col justify-center p-2`}>
        <p className={`text-${isSmall ? 'xxs' : 'xs'} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{description}</p>
        {stats && (
          <div className={`mt-1 space-y-${isSmall ? '0' : '1'}`}>
            {Object.entries(stats).map(([key, value]) => (
              <p key={key} className={`text-${isSmall ? 'xxs' : 'xs'} ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="font-medium">{key}:</span> {value}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganismInfoCard;
