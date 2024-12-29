import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchBar } from "../components/Explorer/SearchBar";
import { ArchiveList } from "../components/Archive/ArchiveList";
import { FilterPanel } from "../components/Archive/FilterPanel";
import { Pagination } from "../components/Pagination/Pagination";

// Custom hooks
import { useSearch } from "../hooks/useSearch";
import { useArchiveFilters } from "../hooks/useArchiveFilters";
import { fetchArchiveQuizzes } from "../hooks/useArchive"; // Import the function

const ITEMS_PER_PAGE = 12;

export default function Archive() {
  const { t } = useTranslation();
  const childId = "64a2c4a5b7e2d5e37e9fc314";

  // State
  const [quizzes, setQuizzes] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Search & filters
  const { query, setQuery, searchResults, isSearching, setItems } = useSearch([]);
  const { filters, filterHandlers, isFilterPanelOpen, toggleFilterPanel } = useArchiveFilters();

  // Decide what to display: local search results or all quizzes
  const displayItems = query ? searchResults : quizzes;
  // Use totalItems from the server for pagination
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Fetch data when currentPage changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, total } = await fetchArchiveQuizzes(childId, currentPage, ITEMS_PER_PAGE);
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
      <div className="flex-1 space-y-8 px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {t("archive.title")}
          </h1>
          <button
            onClick={toggleFilterPanel}
            className="px-4 py-2 bg-blue-100 text-black rounded-lg hover:bg-blue-200 transition-colors"
          >
            {t("archive.filter")}
          </button>
        </div>

        <SearchBar
          value={query}
          onChange={setQuery}
          isSearching={isSearching}
          placeholder={t("archive.searchPlaceholder")}
        />

        <ArchiveList items={displayItems} />

        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={toggleFilterPanel}
          filters={filters}
          handlers={filterHandlers}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isSearching={isSearching || loading}
        />
      </div>
    </div>
  );
}