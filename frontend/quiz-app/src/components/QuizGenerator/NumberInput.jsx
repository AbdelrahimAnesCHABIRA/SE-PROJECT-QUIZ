import { useTranslation } from 'react-i18next';

export const NumberInput = ({ value, onChange }) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-2">
      <label className="block text-lg font-medium text-gray-200">
        {t('quizGenerator.questionsLabel')}
      </label>
      <input
        type="number"
        min="1"
        max="20"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
      />
    </div>
  );
};