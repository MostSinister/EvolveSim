import React from 'react';
import ComponentRow from './ComponentRow';
import ColumnResizer from './ColumnResizer';

function ComponentTable({
  components,
  orderedFields,
  columnWidths,
  setColumnWidths,
  handleFieldChange,
  handleEdit,
  handleDelete,
  handleDuplicate,
  requestSort,
  sortConfig,
  isDarkMode,
  tableRef,
  resizing,
  setResizing,
  biologicalStructure,
  componentType,
  componentCategories, // Add this prop
}) {
  const getSortDirection = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <ChevronUp className="w-4 h-4 inline-block ml-1" /> : <ChevronDown className="w-4 h-4 inline-block ml-1" />;
    }
    return null;
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <table ref={tableRef} className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            {orderedFields.map((key, index) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider relative whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
                style={{ width: columnWidths[index] || 150, maxWidth: columnWidths[index] || 150 }}
                onClick={() => requestSort(key)}
              >
                <span className="flex items-center">
                  {key}
                  {getSortDirection(key)}
                </span>
                <ColumnResizer
                  index={index}
                  startColumnResize={setResizing}
                  columnWidths={columnWidths}
                  setColumnWidths={setColumnWidths}
                />
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '120px', minWidth: '120px' }}>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-600">
          {components.map((component) => (
            <ComponentRow
              key={component.id}
              component={component}
              orderedFields={orderedFields}
              columnWidths={columnWidths}
              handleFieldChange={handleFieldChange}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleDuplicate={handleDuplicate}
              isDarkMode={isDarkMode}
              biologicalStructure={biologicalStructure}
              componentType={componentType}
              componentCategories={componentCategories} // Pass this prop
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComponentTable;
