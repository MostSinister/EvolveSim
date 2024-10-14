import React from 'react';
import { getFieldType, getEnumOptions } from '../utils/structureParser';

function DynamicInput({ componentType, fieldName, value, onChange }) {
  const fieldType = getFieldType(componentType, fieldName);

  switch (fieldType) {
    case 'string':
      if (fieldName === 'Color') {
        return (
          <input
            type="color"
            id={fieldName}
            name={fieldName}
            value={value || '#000000'}
            onChange={onChange}
            className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        );
      }
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
