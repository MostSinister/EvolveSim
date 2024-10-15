import biologicalStructure from '../Data/biological_components_structure.json';

console.log('Loaded biological structure:', biologicalStructure);

// Generate an order of fields for each component type
export function generateFieldOrder() {
  const fieldOrder = {};
  for (const [componentType, structure] of Object.entries(biologicalStructure)) {
    fieldOrder[componentType] = Object.keys(structure.properties || {});
  }
  return fieldOrder;
}

// Get the type of a specific field for a component type
export function getFieldType(componentType, fieldName) {
  console.log('Getting field type for:', componentType, fieldName);
  console.log('Component structure:', biologicalStructure[componentType]);
  return biologicalStructure[componentType]?.properties?.[fieldName]?.type || 'string';
}

// Get enum options for a specific field of a component type
export function getEnumOptions(componentType, fieldName) {
  return biologicalStructure[componentType]?.properties?.[fieldName]?.enum || [];
}

// Validate data against the structure definition
export function validateData(componentType, data) {
  const structure = biologicalStructure[componentType];
  if (!structure) return false;

  for (const [field, schema] of Object.entries(structure.properties || {})) {
    if (schema.required && !data.hasOwnProperty(field)) {
      return false;
    }

    if (data.hasOwnProperty(field)) {
      const value = data[field];
      switch (schema.type) {
        case 'string':
          if (typeof value !== 'string') return false;
          break;
        case 'integer':
          if (!Number.isInteger(value)) return false;
          break;
        case 'number':
          if (typeof value !== 'number') return false;
          break;
        case 'enum':
          if (!schema.enum.includes(value)) return false;
          break;
        default:
          return false;
      }
    }
  }

  return true;
}

// Get the entire biological structure
export function getStructure() {
  return biologicalStructure;
}

// Update the biological structure (placeholder function)
export function updateStructure(newStructure) {
  console.log('Structure update requested:', newStructure);
  // Implement actual update logic here
}

// Validate and convert data according to the structure definition
export function validateAndConvertData(componentType, data) {
  const structure = biologicalStructure[componentType];
  if (!structure) return { isValid: false, convertedData: null };

  const convertedData = {};
  let isValid = true;

  for (const [field, schema] of Object.entries(structure.properties || {})) {
    const safeField = field.replace('/', '_');
    if (schema.required && !data.hasOwnProperty(safeField)) {
      isValid = false;
      break;
    }

    if (data.hasOwnProperty(safeField)) {
      const value = data[safeField];
      let convertedValue;

      switch (schema.type) {
        case 'string':
          convertedValue = String(value);
          if (field === 'Sequence') {
            convertedValue = convertedValue.toUpperCase().replace(/[^A-Z0-9]/g, '');
          }
          break;
        case 'integer':
        case 'number':
          convertedValue = Number(value);
          if (isNaN(convertedValue)) {
            isValid = false;
          }
          break;
        case 'enum':
          if (!schema.enum.includes(value)) {
            isValid = false;
          } else {
            convertedValue = value;
          }
          break;
        default:
          isValid = false;
          break;
      }

      if (isValid) {
        convertedData[safeField] = convertedValue;
      } else {
        break;
      }
    }
  }

  return { isValid, convertedData: isValid ? convertedData : null };
}
