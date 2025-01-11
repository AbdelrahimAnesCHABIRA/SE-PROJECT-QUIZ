import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchBar } from "../components/Explorer/SearchBar";
import { ArchiveList } from "../components/Archive/ArchiveList";
import { FilterPanel } from "../components/Filters/FilterPanel";
import { FilterButton } from "../components/Filters/FilterButton";
import { Pagination } from "../components/Pagination/Pagination";

import { useFilters } from "../hooks/useFilters"; // New import

import { Footer } from "../components/Layout/Footer";
import Navbar from "../components/NavBar";

// Custom hooks
import { useSearch } from "../hooks/useSearch";
import { useArchiveFilters } from "../hooks/useArchiveFilters";
import { fetchArchiveQuizzes } from "../hooks/useArchive"; // Import the function
import { useChildSession } from '../hooks/useChildSession';
const ITEMS_PER_PAGE = 12;

export default function Archive() {
  const { t } = useTranslation();
  const { childId, studyLevel } = useChildSession();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);

  // State
  const [quizzes, setQuizzes] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    subjects,
    chapters,
    selectedSubjects,
    selectedChapters,
    onSubjectsChange,
    onChaptersChange,
    getSelectedFilterLabels
  } = useFilters(studyLevel, childId);
  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  // Search & filters
  const {
    query,
    setQuery,
    searchResults,
    isSearching,
    setItems,
    setChildId,
    setPlayCount,
    totalPages: searchTotalPages,
  } = useSearch([]);
  const { filters, filterHandlers, isFilterPanelOpen, toggleFilterPanel } =
    useArchiveFilters();

  // Decide what to display: local search results or all quizzes
  const displayItems = query ? searchResults : quizzes;
  // Use totalItems from the server for pagination
  const finalTotalPages = query
    ? searchTotalPages
    : Math.ceil(totalItems / ITEMS_PER_PAGE);

  useEffect(() => {
    setPlayCount(2);
  }, [setPlayCount]);
  useEffect(() => {
    setChildId(childId);
  }, [childId, setChildId]);

  // Fetch data when currentPage changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, total } = await fetchArchiveQuizzes(
          childId,
          currentPage,
          ITEMS_PER_PAGE
        );
        setQuizzes(data);
        setTotalItems(total);
        setItems(data); // Update the search hook data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [childId, currentPage, setItems]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to page 1 if local search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, filters]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar/>
      <div className="flex-1 space-y-8 px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {t("archive.title")}
          </h1>
          <FilterButton 
            onClick={() => setIsFilterOpen(true)} 
            isOpen={isFilterOpen}
            selectedFilters={getSelectedFilterLabels()}
          />
        </div>

        <SearchBar
          value={query}
          onChange={setQuery}
          isSearching={isSearching}
          placeholder={t("archive.searchPlaceholder")}
        />

        <ArchiveList items={displayItems} />

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

        <Pagination
          currentPage={currentPage}
          totalPages={finalTotalPages}
          onPageChange={handlePageChange}
          isSearching={isSearching || loading}
        />

      </div>
      <Footer/>
    </div>
  );
}
