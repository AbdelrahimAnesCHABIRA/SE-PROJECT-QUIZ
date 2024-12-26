import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

export const FileUpload = ({ file, onFileChange }) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-2">
      <label className="block text-lg font-medium text-gray-200">
        {t('quizGenerator.uploadLabel')}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-purple-500/30 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
        <div className="space-y-2 text-center">
          <CloudArrowUpIcon className="mx-auto h-12 w-12 text-purple-400" />
          <div className="flex text-sm">
            <label className="relative cursor-pointer rounded-lg px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all">
              <span>{t('quizGenerator.uploadButton')}</span>
              <input
                type="file"
                className="sr-only"
                accept=".pdf,.docx,.txt"
                onChange={onFileChange}
              />
            </label>
          </div>
          {file && (
            <p className="text-sm text-purple-300">
              {file.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};