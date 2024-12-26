import { FunnelIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

export const FilterButton = ({ onClick, isOpen, selectedFilters }) => {
  const { t } = useTranslation();
  
  const getFilterSummary = () => {
    if (!selectedFilters) return '';
    
    const summary = selectedFilters
      .map(filter => filter.label)
      .map(label => label.length > 6 ? `${label.slice(0, 6)}..` : label)
      .join(', ');
      
    return summary ? ` (${summary})` : '';
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors whitespace-nowrap
        ${isOpen 
          ? 'bg-primary text-white border-primary' 
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
    >
      <FunnelIcon className="w-5 h-5" />
      <span>{t('filters.title')}{getFilterSummary()}</span>
    </button>
  );
};