import React, { useState, useRef, useEffect } from 'react';
import { formatDate, formatDateWithWeekday, getRelativeTime, formatDateTime } from '../utils/dateUtils';

const DateDisplay = ({ 
  dateString, 
  format = 'default',
  showRelative = false,
  showWeekday = false,
  showSeconds = false,
  className = ''
}) => {
  const [showFullDate, setShowFullDate] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowFullDate(false);
      }
    };

    if (showFullDate) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showFullDate]);

  if (!dateString) {
    return <span className={`text-gray-400 ${className}`}>-</span>;
  }

  const getFormattedDate = () => {
    switch (format) {
      case 'withWeekday':
        return formatDateWithWeekday(dateString);
      case 'withSeconds':
        return formatDateTime(dateString);
      case 'relative':
        return getRelativeTime(dateString);
      case 'full':
        return showSeconds ? formatDateTime(dateString) : formatDate(dateString);
      default:
        return formatDate(dateString);
    }
  };

  const getDisplayDate = () => {
    if (showRelative) {
      return getRelativeTime(dateString);
    }
    return getFormattedDate();
  };

  const getDateTooltip = () => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '無効な日付';
    
    return `完全な日時: ${formatDateTime(dateString)}`;
  };

  const isRecent = () => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    return diffInHours < 24;
  };

  const isToday = () => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isThisWeek = () => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = (now - date) / (1000 * 60 * 60 * 24);
    return diffInDays < 7;
  };

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <div className="flex flex-col">
        <span 
          className={`font-medium transition-colors duration-200 ${
            isToday() 
              ? 'text-green-600' 
              : isRecent() 
              ? 'text-blue-600' 
              : 'text-gray-700'
          }`}
          title={getDateTooltip()}
        >
          {getDisplayDate()}
        </span>
        
        {/* Additional context indicators */}
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          {isToday() && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
              今日
            </span>
          )}
          {!isToday() && isThisWeek() && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
              今週
            </span>
          )}
          {!isThisWeek() && isRecent() && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
              最近
            </span>
          )}
        </div>
      </div>

      {/* Toggle button for full date */}
      <button
        onClick={() => setShowFullDate(!showFullDate)}
        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
        title={showFullDate ? '簡略表示' : '詳細表示'}
      >
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${showFullDate ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Full date display */}
      {showFullDate && (
        <div className="absolute z-10 mt-2 p-3 bg-white rounded-lg shadow-lg border border-gray-200 min-w-max">
          <div className="text-sm text-gray-600 space-y-1">
            <div><strong>完全な日時:</strong> {formatDateTime(dateString)}</div>
            <div><strong>相対時間:</strong> {getRelativeTime(dateString)}</div>
            <div><strong>曜日付き:</strong> {formatDateWithWeekday(dateString)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateDisplay;
