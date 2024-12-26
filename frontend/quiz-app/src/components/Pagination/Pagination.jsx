import React from 'react';
import { useTranslation } from 'react-i18next';
import { PaginationButton } from './PaginationButton';

export const Pagination = ({ currentPage, totalPages, onPageChange, isSearching }) => {
  const { t } = useTranslation();

  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center gap-2 mt-8" dir="ltr">
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isSearching}
      >
        {t('pagination.previous')}
      </PaginationButton>

      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2">...</span>
          ) : (
            <PaginationButton
              active={page === currentPage}
              onClick={() => onPageChange(page)}
              disabled={isSearching}
            >
              {page}
            </PaginationButton>
          )}
        </React.Fragment>
      ))}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isSearching}
      >
        {t('pagination.next')}
      </PaginationButton>
    </div>
  );
};