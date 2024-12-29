import { useEffect } from 'react';
import { SearchBar } from '../components/Explorer/SearchBar';
import { RecentActivities } from '../components/Explorer/RecentActivities';
import { TrendingSection } from '../components/Explorer/TrendingSection';
import { NewSection } from '../components/Explorer/NewSection';
import { Footer } from '../components/Layout/Footer';
import { SearchResults } from '../components/Explorer/SearchResults';
import { useSearch } from '../hooks/useSearch';


export default function Explorer() {
  const { query, setQuery, searchResults, isSearching, setItems, currentPage, setCurrentPage, totalPages,setPlayCount } = useSearch();
  useEffect(() => {
    setPlayCount(1);
  }, [setPlayCount]);


  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <div className="flex-1 space-y-8 px-4 py-6">
        <SearchBar 
          value={query} 
          onChange={setQuery}
          isSearching={isSearching}
        />
        
        {query ? (
          <SearchResults 
            results={searchResults} 
            query={query} 
            currentPage={currentPage} 
            totalPages={totalPages} 
            handlePageChange={setCurrentPage} 
            isSearching={isSearching}
          />
        ) : (
          <>
            <RecentActivities />
            <TrendingSection />
            <NewSection />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}