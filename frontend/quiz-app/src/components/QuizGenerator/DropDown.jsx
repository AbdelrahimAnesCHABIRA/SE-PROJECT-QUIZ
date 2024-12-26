import { useTranslation } from 'react-i18next';

export const DropDown = ({ value, onChange, items }) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-2">
      <label className="block text-lg font-medium text-gray-200">
        {t('quizGenerator.quizTypeLabel')}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
      >
        <option value="" disabled>{t('quizGenerator.selectType')}</option>
        {items.map((item) => (
          <option key={item._id} value={item._id} className="bg-gray-800">
            {item.moduleName||item.chapterName}
          </option>
        ))}
      </select>
    </div>
  );
};
export default DropDown;