import React from 'react';
import { Edit3, Trash, Copy } from 'lucide-react';

function ComponentRow({
  component,
  orderedFields,
  columnWidths,
  handleFieldChange,
  handleEdit,
  handleDelete,
  handleDuplicate,
  isDarkMode,
  biologicalStructure,
  componentType,
  componentCategories,
}) {
  return (
    <tr
      className={`
        ${isDarkMode ? 'text-black hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-50'}
        transition-colors duration-150 ease-in-out
      `}
    >
      {orderedFields.map((key, index) => (
        <td
          key={key}
          className="px-6 py-4 whitespace-nowrap"
          style={{ width: columnWidths[index] || 150, maxWidth: columnWidths[index] || 150 }}
        >
          {key === 'Category' ? (
            <select
              value={component[key] || ''}
              onChange={(e) => handleFieldChange(component.id, key, e.target.value)}
              className={`w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded
                ${isDarkMode ? 'text-black' : 'text-gray-800'}`}
            >
              <option value="">Select Category</option>
              {componentCategories[`${componentType}Categories`]?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          ) : key === 'Subcategory' ? (
            <select
              value={component[key] || ''}
              onChange={(e) => handleFieldChange(component.id, key, e.target.value)}
              className={`w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded
                ${isDarkMode ? 'text-black' : 'text-gray-800'}`}
            >
              <option value="">Select Subcategory</option>
              {Object.values(componentCategories[`${componentType}Categories`] || {}).flat().map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={biologicalStructure[componentType]?.properties[key]?.type === 'integer' ? 'number' : 'text'}
              value={component[key]}
              onChange={(e) => handleFieldChange(component.id, key, e.target.value)}
              className={`w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded
                ${isDarkMode ? 'text-black' : 'text-gray-800'}
                ${(biologicalStructure[componentType]?.properties[key]?.type === 'integer' || 
                   biologicalStructure[componentType]?.properties[key]?.type === 'number') 
                   ? 'text-center' : ''}`}
              step={biologicalStructure[componentType]?.properties[key]?.type === 'integer' ? 1 : undefined}
              style={key === 'Sequence' ? { textTransform: 'uppercase' } : {}}
            />
          )}
        </td>
      ))}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" style={{ width: '120px', minWidth: '120px' }}>
        <div className="flex justify-end space-x-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleEdit(component); }}
            className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-200"
            title="Edit"
          >
            <Edit3 className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(component.id); }}
            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"
            title="Delete"
          >
            <Trash className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDuplicate(component); }}
            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200"
            title="Duplicate"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ComponentRow;
