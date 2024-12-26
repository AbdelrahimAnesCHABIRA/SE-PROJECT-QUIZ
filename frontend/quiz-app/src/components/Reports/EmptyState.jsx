import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const EmptyState = () => {
  const { t } = useTranslation();
  
  return (
    <div className="text-center py-16">
      <img
        src="/reports-empty.svg"
        alt={t('reports.emptyStateAlt')}
        className="w-48 h-48 mx-auto mb-6"
      />
      <h2 className="text-xl font-semibold mb-2">{t('reports.emptyStateTitle')}</h2>
      <p className="text-gray-600 mb-6">{t('reports.emptyStateDescription')}</p>
      <Link
        to="/bibliotheque"
        className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
      >
        {t('reports.goToLibrary')}
      </Link>
    </div>
  );
};