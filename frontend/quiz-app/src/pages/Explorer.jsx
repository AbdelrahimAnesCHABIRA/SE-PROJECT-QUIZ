import { useEffect } from 'react';
import { SearchBar } from '../components/Explorer/SearchBar';
import { RecentActivities } from '../components/Explorer/RecentActivities';
import { TrendingSection } from '../components/Explorer/TrendingSection';
import { NewSection } from '../components/Explorer/NewSection';
import { Footer } from '../components/Layout/Footer';
import { SearchResults } from '../components/Explorer/SearchResults';
import { useSearch } from '../hooks/useSearch';
import { useChildSession } from '../hooks/useChildSession';


export default function Explorer() {

  const { query, setQuery, searchResults,setChildId, isSearching, setItems, currentPage, setCurrentPage, totalPages,setPlayCount } = useSearch();
  
  const {userId, childId, studyLevel, sessionError, sessionLoading } = useChildSession();

  useEffect(() => {
    setPlayCount(0);
  }, [setPlayCount]);
  useEffect(() => {
    setChildId(childId);
  }, [childId, setChildId]);


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
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}