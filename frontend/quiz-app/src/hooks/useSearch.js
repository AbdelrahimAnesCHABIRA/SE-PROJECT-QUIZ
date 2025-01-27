import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSearch = (initialItems = []) => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(initialItems);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [playCount, setPlayCount] = useState(1);

  // Add state to store childId:
  const [childId, setChildId] = useState('');

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        // Send childId as a filter parameter:
        const response = await axios.get('http://localhost:5000/api/QuizTemplateSearch', {
          params: {
            search: query,
            page: currentPage,
            limit: 12,
            child: childId,
            ...(playCount === 1 ? { 'playCount[$lte]': 1 } : { 'playCount[$gte]': playCount })
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
  }, [query, currentPage, playCount, childId]);

  // Return childId and its setter so you can update it from anywhere in your app
  return {
    query,
    setQuery,
    searchResults,
    isSearching,
    setItems,
    currentPage,
    setCurrentPage,
    totalPages,
    playCount,
    setPlayCount,
    childId,
    setChildId
  };
};