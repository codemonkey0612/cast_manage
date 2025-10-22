import React, { useState, useRef, useEffect } from 'react';

const ModernDatePicker = ({ onDateSelect, onClear, placeholder = "日付を選択...", selectedDate = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('calendar'); // 'calendar', 'year', 'month'
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [displayYear, setDisplayYear] = useState(new Date().getFullYear());
  const [displayMonth, setDisplayMonth] = useState(new Date().getMonth());
  const [selectedHour, setSelectedHour] = useState(10);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setCurrentView('calendar');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize with selected date if provided
  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      setSelectedYear(date.getFullYear());
      setSelectedMonth(date.getMonth());
      setSelectedDay(date.getDate());
      setDisplayYear(date.getFullYear());
      setDisplayMonth(date.getMonth());
    }
  }, [selectedDate]);

  const formatDisplayDate = () => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return placeholder;
  };

  const handleDateSelect = (day) => {
    const date = new Date(displayYear, displayMonth, day);
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDay(day);
    onDateSelect(formattedDate);
    setIsOpen(false);
    setCurrentView('calendar');
  };

  const handleDateTimeSelect = (day, hour = 10, minute = 0) => {
    const date = new Date(displayYear, displayMonth, day, hour, minute);
    const formattedDate = date.toISOString();
    setSelectedDay(day);
    onDateSelect(formattedDate);
    setIsOpen(false);
    setCurrentView('calendar');
  };

  const handleClear = () => {
    setSelectedDay(null);
    setSelectedYear(new Date().getFullYear());
    setSelectedMonth(new Date().getMonth());
    setDisplayYear(new Date().getFullYear());
    setDisplayMonth(new Date().getMonth());
    onClear();
    setIsOpen(false);
    setCurrentView('calendar');
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (displayMonth === 0) {
        setDisplayMonth(11);
        setDisplayYear(displayYear - 1);
      } else {
        setDisplayMonth(displayMonth - 1);
      }
    } else {
      if (displayMonth === 11) {
        setDisplayMonth(0);
        setDisplayYear(displayYear + 1);
      } else {
        setDisplayMonth(displayMonth + 1);
      }
    }
  };

  const generateCalendar = () => {
    const firstDay = new Date(displayYear, displayMonth, 1);
    const lastDay = new Date(displayYear, displayMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const generateYearRange = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      years.push(year);
    }
    return years;
  };

  const generateMonths = () => {
    return [
      '1月', '2月', '3月', '4月', '5月', '6月',
      '7月', '8月', '9月', '10月', '11月', '12月'
    ];
  };

  const renderCalendar = () => {
    const days = generateCalendar();
    const today = new Date();
    const isToday = (day) => {
      return day === today.getDate() && 
             displayMonth === today.getMonth() && 
             displayYear === today.getFullYear();
    };

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => {
              if (day) {
                setSelectedDay(day);
                setShowTimePicker(true);
              }
            }}
            className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
              !day 
                ? 'invisible' 
                : day === selectedDay && displayYear === selectedYear && displayMonth === selectedMonth
                ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                : isToday(day)
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'hover:bg-gray-100 hover:text-gray-900 cursor-pointer'
            }`}
            disabled={!day}
          >
            {day}
          </button>
        ))}
      </div>
    );
  };

  const renderYearView = () => {
    const years = generateYearRange();
    return (
      <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => {
              setDisplayYear(year);
              setCurrentView('month');
            }}
            className={`p-3 text-sm font-medium rounded-lg transition-all duration-200 ${
              year === displayYear
                ? 'bg-blue-500 text-white shadow-lg'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    );
  };

  const renderMonthView = () => {
    const months = generateMonths();
    return (
      <div className="grid grid-cols-3 gap-2">
        {months.map((month, index) => (
          <button
            key={index}
            onClick={() => {
              setDisplayMonth(index);
              setCurrentView('calendar');
            }}
            className={`p-3 text-sm font-medium rounded-lg transition-all duration-200 ${
              index === displayMonth
                ? 'bg-blue-500 text-white shadow-lg'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="text"
            value={formatDisplayDate()}
            placeholder={placeholder}
            readOnly
            onClick={() => setIsOpen(!isOpen)}
            className="w-72 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all duration-200 hover:border-gray-400 bg-white shadow-sm"
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        
        {selectedDate && (
          <button
            onClick={handleClear}
            className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
          >
            クリア
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-50 min-w-80 animate-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('year')}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                年を選択
              </button>
              <button
                onClick={() => setCurrentView('month')}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                月を選択
              </button>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation for calendar view */}
          {currentView === 'calendar' && (
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-lg font-semibold text-gray-800">
                {displayYear}年{displayMonth + 1}月
              </h3>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Content based on current view */}
          {currentView === 'calendar' && renderCalendar()}
          {currentView === 'year' && renderYearView()}
          {currentView === 'month' && renderMonthView()}

          {/* Time Picker */}
          {showTimePicker && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-gray-700">時間を選択</h4>
                <button
                  onClick={() => setShowTimePicker(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-600 mb-1">時間</label>
                  <select
                    value={selectedHour}
                    onChange={(e) => setSelectedHour(parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>
                        {String(i).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex flex-col">
                  <label className="text-xs text-gray-600 mb-1">分</label>
                  <select
                    value={selectedMinute}
                    onChange={(e) => setSelectedMinute(parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i}>
                        {String(i).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      handleDateTimeSelect(selectedDay, selectedHour, selectedMinute);
                      setShowTimePicker(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    確定
                  </button>
                  <button
                    onClick={() => {
                      handleDateSelect(selectedDay);
                      setShowTimePicker(false);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    日付のみ
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModernDatePicker;
