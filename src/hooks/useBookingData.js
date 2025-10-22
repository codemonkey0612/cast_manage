import { useState, useEffect, useMemo } from 'react';

const useBookingData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  // Filter out empty rows and show only valid booking data
  const validData = useMemo(() => {
    return data.filter(row => 
      row.日付 && 
      row.店舗 && 
      row.キャスト && 
      row.名前 && 
      row.電話番号
    );
  }, [data]);

  // Filter data to show only specified fields
  const filteredData = useMemo(() => {
    return validData.map(row => ({
      日付: row.日付,
      店舗: row.店舗,
      キャスト: row.キャスト,
      指名: row.指名,
      名前: row.名前,
      電話番号: row.電話番号,
      メール: row.メール
    }));
  }, [validData]);

  // Sort functionality
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Filter by date if search date is provided
  const searchFilteredData = useMemo(() => {
    if (!searchDate) return sortedData;
    
    return sortedData.filter(row => {
      if (!row.日付) return false;
      const rowDate = new Date(row.日付).toDateString();
      const searchDateObj = new Date(searchDate).toDateString();
      return rowDate === searchDateObj;
    });
  }, [sortedData, searchDate]);

  const handleDateSearch = (date) => {
    setSearchDate(date);
  };

  const clearSearch = () => {
    setSearchDate('');
  };

  return {
    data: searchFilteredData,
    loading,
    error,
    sortConfig,
    searchDate,
    handleSort,
    handleDateSearch,
    clearSearch
  };
};

export default useBookingData;
