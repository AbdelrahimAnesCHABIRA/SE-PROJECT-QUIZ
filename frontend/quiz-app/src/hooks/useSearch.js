import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSearch = (initialItems = []) => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(initialItems);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const response = await axios.get('http://localhost:5000/api/QuizTemplateSearch', {
          params: {
            search: query,
            page: currentPage,
            limit: 12
          }
        });
        setSearchResults(response.data.results);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error('Failed to fetch search results:', err);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, currentPage]);

  return {
    query,
    setQuery,
    searchResults,
    isSearching,
    setItems,
    currentPage,
    setCurrentPage,
    totalPages
  };
};