import React from 'react';

function ComponentTypeSelector({ componentType, setComponentType, biologicalStructure }) {
  return (
    <div className="mb-8 flex flex-wrap gap-4">
      {Object.keys(biologicalStructure).map((type) => (
        <button
          key={type}
          onClick={() => setComponentType(type)}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 ${
            componentType === type 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export default ComponentTypeSelector;
