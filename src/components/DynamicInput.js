import React from 'react';
import { getFieldType, getEnumOptions } from '../utils/structureParser'; // Import utility functions

// DynamicInput component definition
function DynamicInput({ componentType, fieldName, value, onChange }) {
  // Determine the field type using a utility function
  const fieldType = getFieldType(componentType, fieldName);

  // Render different input types based on the field type
  switch (fieldType) {
    case 'string':
      // Special case for color input
      if (fieldName === 'Color') {
        return (
          <input
            type="color"
            id={fieldName}
            name={fieldName}
            value={value || '#000000'} // Default color value
            onChange={onChange}
            className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        );
      }
      // Default text input for strings
      return (
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          value={value || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      );
    case 'integer':
    case 'number':
      // Number input for integer and number types
      return (
        <input
          type="number"
          id={fieldName}
          name={fieldName}
          value={value || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      );
    case 'enum':
      // Dropdown select for enum types
      const options = getEnumOptions(componentType, fieldName);
      return (
        <select
          id={fieldName}
          name={fieldName}
          value={value || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
        >
          <option value="">Select {fieldName}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    default:
      // Default to text input for unknown types
      return (
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          value={value || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      );
  }
}

export default DynamicInput;
