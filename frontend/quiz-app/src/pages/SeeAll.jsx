import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../components/Search/SearchInput';
import { Pagination } from '../components/Pagination/Pagination';
import { usePagination } from '../hooks/usePagination';
import { FilterButton } from '../components/Filters/FilterButton';
import { FilterPanel } from '../components/Filters/FilterPanel';
import { useFilters } from '../hooks/useFilters';
import { QuizCard } from '../components/quiz/quizcard/QuizCard';
import  Spinner  from '../components/spinner/Spinner';
import { 
  fetchRecentQuizzes, 
  fetchRecentFilteredQuizzes, 
} from '../services/sectionDataService';


export default function SeeAll() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [activeFilters, setActiveFilters] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / 12); // 12 is the limit per page
  
  const {
    subjects,
    chapters,
    selectedSubjects,
    selectedChapters,
    selectedQuestionCount,
    selectedQuizTypes,
    onSubjectsChange,
    onChaptersChange,
    onQuestionCountChange,
    getSelectedFilterLabels
  } = useFilters();
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchPageData = async (page) => {
    setLoading(true);
    try {
      const section = new URLSearchParams(location.search).get('section');
      const childId = '64a2c4a5b7e2d5e37e9fc314';
      
      const response = activeFilters 
        ? await fetchRecentFilteredQuizzes(childId, page, activeFilters)
        : await fetchRecentQuizzes(childId, page);
      
      setItems(response.data);
      setTotalItems(response.total);
      setFilteredItems(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData(currentPage);
  }, [currentPage, location.search, activeFilters]);

  const handleApplyFilters = (filters) => {
    console.log('Applying filters:', filters);
    setActiveFilters(filters);
    handlePageChange(1); // Reset to first page when filters change
  };


  // const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);


  // Apply filters and search
  useEffect(() => {
    let filtered = [...items];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply other filters here
    // This is where you would implement the actual filtering logic
    // based on selectedSubjects, selectedChapters, etc.

    setFilteredItems(filtered);
  }, [items, searchQuery, selectedSubjects, selectedChapters, selectedQuestionCount, selectedQuizTypes]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('explorer.allItems')}
          </h1>
          
          <div className="flex gap-4 items-center w-full">
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
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
        filteredItems.map((quiz, index) => (
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
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isSearching={loading}
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
          questionCount={selectedQuestionCount}
          onQuestionCountChange={onQuestionCountChange}
          onApplyFilters={handleApplyFilters}
        />
      </div>
    </div>
  );
}