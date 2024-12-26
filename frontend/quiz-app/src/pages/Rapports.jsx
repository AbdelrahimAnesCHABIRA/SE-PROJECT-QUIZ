import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '../components/Reports/SearchBar';
import { FilterDropdown } from '../components/Reports/FilterDropdown';
import { DateFilter } from '../components/Reports/DateFilter';
import { EmptyState } from '../components/Reports/EmptyState';

export default function Rapports() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    game: '',
    report: '',
    class: '',
    date: ''
  });

  const gameOptions = [
    { value: 'all', label: 'reports.filters.allGames' },
    { value: 'quiz', label: 'reports.filters.quizzes' },
    { value: 'presentation', label: 'reports.filters.presentations' }
  ];

  const reportOptions = [
    { value: 'all', label: 'reports.filters.allReports' },
    { value: 'class', label: 'reports.filters.classReports' },
    { value: 'individual', label: 'reports.filters.individualReports' }
  ];

  const classOptions = [
    { value: 'all', label: 'reports.filters.allClasses' },
    { value: 'class1', label: 'reports.filters.class1' },
    { value: 'class2', label: 'reports.filters.class2' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-2xl font-bold text-gray-900">{t('reports.title')}</h1>
        <div className="w-full sm:w-72">
          <SearchBar />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <FilterDropdown
          label={t('reports.filters.games')}
          options={gameOptions}
          value={filters.game}
          onChange={(value) => setFilters({ ...filters, game: value })}
        />
        <FilterDropdown
          label={t('reports.filters.reports')}
          options={reportOptions}
          value={filters.report}
          onChange={(value) => setFilters({ ...filters, report: value })}
        />
        <FilterDropdown
          label={t('reports.filters.classes')}
          options={classOptions}
          value={filters.class}
          onChange={(value) => setFilters({ ...filters, class: value })}
        />
        <DateFilter
          onChange={(value) => setFilters({ ...filters, date: value })}
        />
      </div>

      <EmptyState />
    </div>
  );
}