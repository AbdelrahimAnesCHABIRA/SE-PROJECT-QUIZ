import { useTranslation } from 'react-i18next';

import { Pagination } from '../Pagination/Pagination';
import { useHandleBoxClick } from '../../hooks/handleBoxClick';
import { QuizCard } from '../quiz/quizcard/QuizCard';
export const SearchResults = ({ results, query, currentPage, totalPages, handlePageChange, isSearching }) => {
  const { t } = useTranslation();
  const handleBoxClick = useHandleBoxClick();
  if (isSearching) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {t('explorer.searching')}
        </h2>
        <p className="text-gray-600">
          {t('explorer.pleaseWait')}
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {t('explorer.noResults')}
        </h2>
        <p className="text-gray-600">
          {t('explorer.tryDifferentSearch')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {t('explorer.searchResults')} "{query}"
        </h2>
        <span className="text-gray-600">
          {results.length} {t('explorer.resultsFound')}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.map((result, index) => (
          <QuizCard 
          key={index} 
          id={result._id}
          title={result.title}
          totalQuestions={result.questions.length}
          answeredQuestions={result.progress}
          imageUrl={result.imageUrl || "https://th.bing.com/th/id/OIP.gWOiWm7jk5xYn8vkXme75wHaHa?rs=1&pid=ImgDetMain"}
          year={result.year || "2024"}
          className={result.classNam|| "Math"}
          playCount={result.playCount}
          onClick={() => handleBoxClick(result)}
        />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isSearching={isSearching}
        />
      )}
    </div>
  );
};