import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '../components/Explorer/SearchBar';
import { ArchiveList } from '../components/Archive/ArchiveList';
import { useSearch } from '../hooks/useSearch';
import { useArchiveFilters } from '../hooks/useArchiveFilters';
import { FilterPanel } from '../components/Archive/FilterPanel';



// Mock data - replace with actual API call
const quizzes = [
  {
    id: 1,
    title: " الفصل الأول: المقدمة",
    totalQuestions: 10,
    answeredQuestions: 10,
    imageUrl:"https://www.journaldugeek.com/content/uploads/2023/07/one-piece-anime-original.jpg",
    year: "2021",
    className : "رياضيات الاولى ابتدائي",
  },
];



export default function Archive() {
  const { t } = useTranslation();
  const { query, setQuery, searchResults, isSearching, setItems } = useSearch(quizzes);
  const { filters, filterHandlers, isFilterPanelOpen, toggleFilterPanel } = useArchiveFilters();

  useEffect(() => {
    setItems(quizzes);
  }, [setItems]);

  const displayItems = query ? searchResults : quizzes;

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <div className="flex-1 space-y-8 px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{t('archive.title')}</h1>
          <button
            onClick={toggleFilterPanel}
            className="px-4 py-2 bg-blue-100 text-black rounded-lg hover:bg-blue-200 transition-colors"
          >
            {t('archive.filter')}
          </button>
        </div>

        <SearchBar 
          value={query}
          onChange={setQuery}
          isSearching={isSearching}
          placeholder={t('archive.searchPlaceholder')}
        />

        <ArchiveList items={displayItems} />

        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={toggleFilterPanel}
          filters={filters}
          handlers={filterHandlers}
        />
      </div>
    </div>
  );
}