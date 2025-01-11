import { useTranslation } from 'react-i18next';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { MultiSelect } from '../Filters/MultiSelect';

export const FilterPanel = ({ isOpen, onClose, filters, handlers }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const subjects = [
    { value: 'math', label: t('subjects.math') },
    { value: 'physics', label: t('subjects.physics') },
    { value: 'chemistry', label: t('subjects.chemistry') },
    { value: 'biology', label: t('subjects.biology') }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 h-full" onClick={onClose}>
      <div 
        className="absolute left-4 top-[72px] w-80 bg-white rounded-lg shadow-xl flex flex-col max-h-[calc(100vh-96px)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{t('archive.filter')}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('archive.subjects')}
            </label>
            <MultiSelect
              options={subjects}
              value={filters.subjects}
              onChange={handlers.setSubjects}
              placeholder={t('archive.selectSubjects')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('archive.dateRange')}
            </label>
            <div className="space-y-2">
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handlers.setDateRange({ ...filters.dateRange, start: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handlers.setDateRange({ ...filters.dateRange, end: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('archive.scoreRange')}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max="100"
                value={filters.scoreRange.min}
                onChange={(e) => handlers.setScoreRange({ ...filters.scoreRange, min: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={filters.scoreRange.max}
                onChange={(e) => handlers.setScoreRange({ ...filters.scoreRange, max: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between p-4 border-t">
          <button
            onClick={handlers.resetFilters}
            className="text-gray-600 hover:text-gray-800"
          >
            {t('archive.clearFilters')}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover"
          >
            {t('archive.applyFilters')}
          </button>
        </div>
      </div>
    </div>
  );
};