import React from 'react';

const DataTable = ({ data, sortConfig, onSort, columns }) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <span className="text-gray-400 text-sm">↕</span>;
    }
    return sortConfig.direction === 'asc' ? 
      <span className="text-blue-600 text-sm">↑</span> : 
      <span className="text-blue-600 text-sm">↓</span>;
  };

  return (
    <div className="relative">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-auto max-h-[70vh]">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-all duration-200 group bg-white border-b border-gray-200"
                  onClick={() => onSort(column.key)}
                >
                  <div className="flex items-center gap-2 sm:gap-3 group-hover:text-gray-900">
                    {column.label}
                    <div className="transition-transform duration-200 group-hover:scale-110">
                      {getSortIcon(column.key)}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 group-hover:text-gray-800 bg-white">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {data.map((row, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4">
            <div className="space-y-3">
              {columns.map((column) => (
                <div key={column.key} className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                  <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider sm:w-24 sm:flex-shrink-0">
                    {column.label}:
                  </div>
                  <div className="text-sm text-gray-900 flex-1">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
