import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from "../components/Explorer/SearchBar";
import { Pagination } from '../components/Pagination/Pagination';
import { FilterButton } from '../components/Filters/FilterButton';
import { FilterPanel } from '../components/Filters/FilterPanel';
import { useFilters } from '../hooks/useFilters';
import { useSearch } from '../hooks/useSearch';
import { QuizCard } from '../components/quiz/quizcard/QuizCard';
import Spinner from '../components/spinner/Spinner';
import { 
  fetchRecentQuizzes, 
  fetchRecentFilteredQuizzes, 
} from '../services/sectionDataService';
import { useChildSession } from '../hooks/useChildSession';
import { Footer } from '../components/Layout/Footer';
import { use } from 'react';
import Navbar from '../components/NavBar';

export default function SeeAll() {
  const { childId, studyLevel, sessionError, sessionLoading } = useChildSession();
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [activeFilters, setActiveFilters] = useState(null);
  const navigate = useNavigate();

  // Search & filters
  const {
    query,
    setQuery,
    searchResults,
    isSearching,
    setItems: setSearchItems,
    currentPage,
    setPlayCount,
    setChildId,
    setCurrentPage,
    totalPages: searchTotalPages,
  } = useSearch([]);

  const {
    subjects,
    chapters,
    selectedSubjects,
    selectedChapters,
    onSubjectsChange,
    onChaptersChange,
    getSelectedFilterLabels
  } = useFilters(studyLevel, childId);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    setChildId(childId);
  }, [childId, setChildId]);
  useEffect(() => {
    setPlayCount(0);
  }, [setPlayCount]);

  const fetchPageData = async (page) => {
    setLoading(true);
    try {
      const response = activeFilters 
        ? await fetchRecentFilteredQuizzes(childId, page, activeFilters)
        : await fetchRecentQuizzes(childId, page);
      
      setItems(response.data);
      setTotalItems(response.total);
      setSearchItems(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }; 

  useEffect(() => {
    // Only fetch data when childId is available and session is no longer loading
    if (!sessionLoading && childId) {
      fetchPageData(currentPage);
    }
  }, [currentPage, location.search, activeFilters, childId, sessionLoading]);

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    handlePageChange(1);
  };

  // Decide what to display
  const displayItems = query ? searchResults : items;
  const finalTotalPages = query ? searchTotalPages : Math.ceil(totalItems / 12);

  return (

    <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
      <Navbar/>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('explorer.allItems')}
          </h1>
          
          <div className="flex gap-4 items-center w-full">
            <SearchBar
              value={query}
              onChange={setQuery}
              isSearching={isSearching}
              placeholder={t('explorer.searchPlaceholder')}
            />
            <FilterButton 
              onClick={() => setIsFilterOpen(true)} 
              isOpen={isFilterOpen}
              selectedFilters={getSelectedFilterLabels()}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            <Spinner/>
          ) : (
            displayItems.map((quiz, index) => (
              <QuizCard 
                key={index} 
                id={quiz._id}
                title={quiz.title}
                totalQuestions={quiz.questions.length}
                answeredQuestions={quiz.progress}
                imageUrl={quiz.imageUrl || "https://th.bing.com/th/id/OIP.gWOiWm7jk5xYn8vkXme75wHaHa?rs=1&pid=ImgDetMain"}
                year={quiz.year}
                className={quiz.className}
                playCount={quiz.playCount}
                onClick={() => navigate('/quiz', {
                  state: { questions: quiz.questions, quizTemplate_id: quiz._id }
                })}
              />
            ))
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={finalTotalPages}
          onPageChange={handlePageChange}
          isSearching={isSearching || loading}
        />

        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          subjects={subjects}
          selectedSubjects={selectedSubjects}
          onSubjectsChange={onSubjectsChange}
          chapters={chapters}
          selectedChapters={selectedChapters}
          onChaptersChange={onChaptersChange}
          onApplyFilters={handleApplyFilters}
        />
      </div>
      <Footer/>
    </div>
  );
}


/**
 * 
 * we need to use a factory function to use the search 
 */