import React from 'react';

function ComponentTypeSelector({ componentType, setComponentType, biologicalStructure }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {Object.keys(biologicalStructure).map((type) => (
        <button
          key={type}
          onClick={() => setComponentType(type)}
          className={`px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300 ${
            componentType === type
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export default ComponentTypeSelector;
