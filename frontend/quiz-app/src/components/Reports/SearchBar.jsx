import { useTranslation } from 'react-i18next';

export const SearchBar = () => {
  const { t } = useTranslation();
  
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={t('reports.searchPlaceholder')}
        className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
    </div>
  );
};