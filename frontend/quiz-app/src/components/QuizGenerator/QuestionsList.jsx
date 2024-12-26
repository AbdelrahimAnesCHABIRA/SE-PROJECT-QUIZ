import { useTranslation } from 'react-i18next';

export const QuestionsList = ({ mcqs }) => {
  const { t } = useTranslation();
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
        {t('quizGenerator.questionsTitle')}
      </h2>
      <div className="space-y-6">
        {mcqs.map((mcq, index) => (
          <div 
            key={index}
            className="relative bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl" />
            <div className="relative">
              <p className="text-xl font-semibold text-white mb-4">{mcq.question}</p>
              <div className="space-y-2">
                {mcq.options.map((option, idx) => (
                  <p key={idx} className="text-gray-300 pr-4">{option}</p>
                ))}
              </div>
              <p className="mt-4 text-emerald-400 font-medium">
                {t('quizGenerator.correctAnswer')}: {mcq.correctAnswer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};