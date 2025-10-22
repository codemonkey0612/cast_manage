import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, onClear, placeholder = "検索...", searchResults = null }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (term) => {
    if (term.trim()) {
      setSearchTerm(term);
      onSearch(term);
      setShowSuggestions(false);
      
      // Add to search history
      const newHistory = [term, ...searchHistory.filter(h => h !== term)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('searchHistory');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  // Generate search suggestions
  const generateSuggestions = () => {
    const suggestions = [
      { type: '店舗', examples: ['新宿店', '渋谷店', '池袋店'], icon: '🏪' },
      { type: 'キャスト', examples: ['田中', '佐藤', '鈴木'], icon: '👤' },
      { type: 'お名前', examples: ['山田', '田中', '佐藤'], icon: '👥' },
      { type: '電話番号', examples: ['090-', '080-', '070-'], icon: '📞' }
    ];

    return suggestions.map(suggestion => ({
      ...suggestion,
      display: `${suggestion.type}で検索`
    }));
  };

  const quickFilters = [
    { label: '今日の予約', value: 'today', icon: '📅' },
    { label: '今週の予約', value: 'week', icon: '📊' },
    { label: '新規予約', value: 'new', icon: '✨' },
    { label: '完了済み', value: 'completed', icon: '✅' }
  ];

  return (
    <div className="relative w-full" ref={searchRef}>
      {/* Main Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={`w-full pl-12 pr-20 py-3 border-2 rounded-xl text-base transition-all duration-300 focus:outline-none bg-white ${
            isFocused 
              ? 'border-blue-500 shadow-lg shadow-blue-100' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        />
        
        {/* Action Buttons */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
          {searchTerm && (
            <button
              onClick={handleClear}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              title="クリア"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            onClick={() => handleSearch(searchTerm)}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium"
          >
            検索
          </button>
        </div>
      </div>

      {/* Enhanced Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Quick Filters */}
          <div className="p-4 border-b border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">クイックフィルター</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickFilters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(filter.value)}
                  className="flex items-center space-x-2 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-lg">{filter.icon}</span>
                  <span className="text-sm text-gray-600">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Suggestions */}
          <div className="p-4 border-b border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">検索のヒント</h4>
            <div className="space-y-1">
              {generateSuggestions().map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion.examples[0])}
                  className="flex items-center space-x-3 p-2 w-full text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-lg">{suggestion.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{suggestion.display}</div>
                    <div className="text-xs text-gray-500">例: {suggestion.examples.join(', ')}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">最近の検索</h4>
              <div className="space-y-1">
                {searchHistory.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(term)}
                    className="flex items-center space-x-2 p-2 w-full text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="p-4 bg-gray-50">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Enterで検索、Escで閉じる</span>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Summary */}
      {searchResults && searchResults.length > 0 && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-green-800">
              {searchResults.length}件の結果が見つかりました
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
