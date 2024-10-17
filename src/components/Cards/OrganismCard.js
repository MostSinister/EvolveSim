import React from 'react';
import Lottie from 'lottie-react';
import { GripVertical } from 'lucide-react';

const OrganismCard = ({ organism, isDarkMode, onClick, onHover, isDraggable }) => {
  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-300';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';

  return (
    <div
      className={`${cardBgColor} p-4 rounded-lg shadow-lg border ${borderColor} mb-4 cursor-pointer relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl`}
      onClick={() => onClick(organism)}
      onMouseEnter={() => onHover && onHover(organism)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-lg font-semibold ${organism.textColor}`}>{organism.name}</h3>
          <p className={`text-sm ${textColor}`}>{organism.title}</p>
        </div>
        {isDraggable && (
          <GripVertical className={`${textColor} cursor-move`} />
        )}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-1/2">
        <Lottie animationData={organism.animationData} loop={true} />
      </div>
    </div>
  );
};

export default OrganismCard;
