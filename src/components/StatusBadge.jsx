import React from 'react';

const StatusBadge = ({ type, children }) => {
  const getBadgeStyles = (type) => {
    switch (type) {
      case 'store':
        return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300 shadow-sm';
      case 'appointment':
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300 shadow-sm';
      case 'success':
        return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-sm';
      case 'error':
        return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300 shadow-sm';
      case 'warning':
        return 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300 shadow-sm';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 shadow-sm';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 ${getBadgeStyles(type)}`}>
      {children}
    </span>
  );
};

export default StatusBadge;
