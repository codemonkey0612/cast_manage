import React, { useState, useMemo } from 'react';
import DataTable from './components/DataTable';
import ModernDatePicker from './components/ModernDatePicker';
import SearchBar from './components/SearchBar';
import UserAvatar from './components/UserAvatar';
import LoadingSpinner from './components/LoadingSpinner';
import StatusBadge from './components/StatusBadge';
import DateDisplay from './components/DateDisplay';
import useBookingData from './hooks/useBookingData';
import { formatDate } from './utils/dateUtils';
import './App.css';

function App() {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbyCehoGZn1vYZDGydhWwZ9AiGinNnixzxQrGNOPXDUjsyf_luSvQsSnZPUsFmztu4EmXw/exec/AKfycbymhTEHT5qSLeAPOXrrj2daeWFV8e6-yK8WM0mrI4hckjmns36OgLe1axJ-1EX32aSNaw/exec";
  
  // State for search
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  
  const {
    data,
    loading,
    error,
    sortConfig,
    searchDate,
    handleSort,
    handleDateSearch,
    clearSearch
  } = useBookingData(GAS_URL);

  // Global search functionality
  const filteredData = useMemo(() => {
    if (!globalSearchTerm) return data;
    
    const searchLower = globalSearchTerm.toLowerCase();
    return data.filter(item => 
      Object.values(item).some(value => 
        String(value).toLowerCase().includes(searchLower)
      )
    );
  }, [data, globalSearchTerm]);

  const handleGlobalSearch = (term) => {
    setGlobalSearchTerm(term);
  };

  const handleGlobalSearchClear = () => {
    setGlobalSearchTerm('');
  };


  const columns = [
    {
      key: '日付',
      label: '日付',
      render: (value) => (
        <DateDisplay 
          dateString={value} 
          format="withWeekday"
          showRelative={false}
          className="text-sm"
        />
      )
    },
    {
      key: '店舗',
      label: '店舗',
      render: (value) => <StatusBadge type="store">{value}</StatusBadge>
    },
    {
      key: 'キャスト',
      label: 'キャスト',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <UserAvatar 
            name={value} 
            size="sm" 
            showStatus={true}
            status="online"
          />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: '指名',
      label: '指名タイプ',
      render: (value) => <StatusBadge type="appointment">{value}</StatusBadge>
    },
    {
      key: '名前',
      label: 'お名前',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <UserAvatar 
            name={value} 
            size="sm" 
            showStatus={true}
            status="online"
          />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: '電話番号',
      label: '電話番号',
      render: (value) => (
        <span className="font-mono text-sm text-gray-600">{value}</span>
      )
    },
    {
      key: 'メール',
      label: 'メール',
      render: (value) => (
        <span className="text-blue-600 hover:text-blue-800 cursor-pointer">{value}</span>
      )
    }
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">データ読み込みエラー</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 sm:py-6 lg:py-8 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-400">予約管理システム</h1>
                  <p className="text-purple-200 mt-1 text-xs sm:text-sm">予約の管理と追跡</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Stats Cards */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-3 border border-white/20 flex-1 sm:flex-none">
                  <div className="text-white/80 text-xs font-medium">総予約数</div>
                  <div className="text-xl sm:text-2xl font-bold text-white">{filteredData.length}</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-3 border border-white/20 flex-1 sm:flex-none">
                  <div className="text-white/80 text-xs font-medium">今日の予約</div>
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    {data.filter(item => {
                      const today = new Date().toISOString().split('T')[0];
                      return item['日付']?.toString().split('T')[0] === today;
                    }).length}
                  </div>
                </div>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs sm:text-sm">A</span>
                </div>
                <div className="text-right">
                  <div className="text-white text-xs sm:text-sm font-medium">管理者</div>
                  <div className="text-purple-200 text-xs">オンライン</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Enhanced Search Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Global Search */}
            <div className="lg:col-span-2">
              <div className="mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">検索</h3>
                <p className="text-xs sm:text-sm text-gray-600">全フィールドを検索できます</p>
              </div>
              <SearchBar
                onSearch={handleGlobalSearch}
                onClear={handleGlobalSearchClear}
                placeholder="店舗、キャスト、お名前、電話番号で検索..."
                searchResults={filteredData}
              />
            </div>
            
            {/* Date Filter */}
            <div>
              <div className="mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">日付フィルター</h3>
                <p className="text-xs sm:text-sm text-gray-600">特定の日付で絞り込み</p>
              </div>
              <ModernDatePicker
                onDateSelect={handleDateSearch}
                onClear={searchDate ? clearSearch : null}
                placeholder="日付を選択..."
                selectedDate={searchDate}
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">予約一覧</h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  {globalSearchTerm 
                    ? `検索結果: ${filteredData.length}件の予約` 
                    : searchDate 
                    ? `フィルター結果: ${filteredData.length}件の予約` 
                    : `全予約: ${filteredData.length}件`
                  }
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-gray-600">リアルタイム更新</span>
                </div>
                {globalSearchTerm && (
                  <button
                    onClick={handleGlobalSearchClear}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs sm:text-sm"
                  >
                    検索をクリア
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {loading ? (
            <LoadingSpinner message="予約を読み込み中..." />
          ) : filteredData.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {globalSearchTerm ? '検索結果が見つかりません' : '予約が見つかりません'}
              </h3>
              <p className="text-gray-600">
                {globalSearchTerm 
                  ? '検索条件を変更してお試しください。' 
                  : searchDate 
                  ? '選択された日付の予約が見つかりません。' 
                  : '利用可能な予約がありません。'
                }
              </p>
            </div>
          ) : (
            <DataTable
              data={filteredData}
              columns={columns}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          )}
        </div>
      </main>

    </div>
  );
}

export default App;