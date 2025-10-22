import React, { useState, useRef, useEffect } from 'react';

const GlobalSearchBar = ({ onSearch, onClear, placeholder = "全フィールドを検索...", searchResults = null }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

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
    setSearchTerm(term);
    onSearch(term);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  // Generate search suggestions based on common search patterns
  const generateSuggestions = () => {
    const suggestions = [
      { type: '店舗', examples: ['新宿店', '渋谷店', '池袋店'] },
      { type: 'キャスト', examples: ['田中', '佐藤', '鈴木'] },
      { type: 'お名前', examples: ['山田', '田中', '佐藤'] },
      { type: '電話番号', examples: ['090-', '080-', '070-'] }
    ];

    return suggestions.map(suggestion => ({
      ...suggestion,
      display: `${suggestion.type}で検索`
    }));
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
          <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={`w-full pl-10 sm:pl-12 pr-20 sm:pr-24 py-2 sm:py-3 lg:py-4 border-2 rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg transition-all duration-300 focus:outline-none ${
            isFocused 
              ? 'border-blue-500 shadow-lg shadow-blue-100' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-4 space-x-1 sm:space-x-2">
          {searchTerm && (
            <button
              onClick={handleClear}
              className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            onClick={() => handleSearch(searchTerm)}
            className="px-2 sm:px-3 lg:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 text-xs sm:text-sm"
          >
            検索
          </button>
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">検索のヒント</h4>
            <div className="space-y-2">
              {generateSuggestions().map((suggestion, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                     onClick={() => handleSearch(suggestion.examples[0])}>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{suggestion.display}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50">
            <div className="text-xs text-gray-500">
              💡 ヒント: 店舗名、キャスト名、お客様名、電話番号などで検索できます
            </div>
          </div>
        </div>
      )}

      {/* Search Results Summary */}
      {searchResults && searchResults.length > 0 && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center space-x-2">
            <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default GlobalSearchBar;
