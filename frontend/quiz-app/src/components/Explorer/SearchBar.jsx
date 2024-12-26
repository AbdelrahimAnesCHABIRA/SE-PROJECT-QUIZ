import { useTranslation } from 'react-i18next';

export const SearchBar = ({ value, onChange, isSearching }) => {
  const { t } = useTranslation();
  
  return (
    <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-w-xl mx-auto mb-8">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('explorer.searchPlaceholder')}
        className="w-full px-6 py-3 pr-12 text-right rounded-full border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
        {isSearching ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>
    </form>
  );
};