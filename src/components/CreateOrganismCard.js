import React from 'react';
import { Plus } from 'lucide-react';

const CreateOrganismCard = ({ isDarkMode }) => {
  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-300';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';

  return (
    <div className={`${cardBgColor} p-4 rounded-lg shadow-lg border ${borderColor} mb-4 cursor-pointer hover:bg-opacity-80`}>
      <div className="flex items-center justify-center">
        <Plus className={`w-6 h-6 ${textColor} mr-2`} />
        <span className={`${textColor} font-semibold`}>Create New Organism</span>
      </div>
    </div>
  );
};

export default CreateOrganismCard;
