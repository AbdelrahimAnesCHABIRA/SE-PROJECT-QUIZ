import { useQuizGenerator } from '../hooks/useQuizGenerator';
import { FileUpload } from '../components/QuizGenerator/FileUpload';
import { NumberInput } from '../components/QuizGenerator/NumberInput';
import { QuestionsList } from '../components/QuizGenerator/QuestionsList';
import { useTranslation } from 'react-i18next';
import { StarAnimation } from '../components/Sidebar/components/StarAnimation';
import { QuizNameInput } from '../components/QuizGenerator/QuizNameInput';
import DropDown from '../components/QuizGenerator/DropDown';
import { useEffect } from 'react';

export default function QuizizzAI() {
  const {
    file,
    numQuestions,
    mcqs,
    loading,
    error,
    QuizName,
    chapters,
    selectedModule,
    selectedChapter,
    availableModules,
    validationError,
    setQuizName,
    setNumQuestions,
    setSelectedModule,
    setSelectedChapter,
    setValidationError,
    handleFileChange,
    handleSubmit: originalHandleSubmit,
    fetchChaptersBase,
  } = useQuizGenerator();
  
  const { t } = useTranslation();
  

  // Fetch chapters when module changes
  useEffect(() => {
    if (selectedModule) {
      fetchChaptersBase();
    }
  }, [selectedModule]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!selectedModule) {
      setValidationError('Please select a module');
      return;
    }
    if (!selectedChapter) {
      setValidationError('Please select a chapter');
      return;
    }

    originalHandleSubmit(e);
  };

  return (
    <div className="fixed inset-0 right-16 md:right-64 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 overflow-auto" dir="rtl">
      <div className="max-w-4xl mx-auto pb-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8 leading-loose">
            {t('quizGenerator.title')}
          </h1>
          <p className="text-lg text-gray-300 leading-loose">
            {t('quizGenerator.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl p-1">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl" />
          </div>
          
          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 space-y-6">
            <StarAnimation />
            <FileUpload file={file} onFileChange={handleFileChange} />
            <QuizNameInput value={QuizName} onChange={setQuizName} />
            <NumberInput value={numQuestions} onChange={setNumQuestions} />
            <DropDown 
              value={selectedModule} 
              onChange={setSelectedModule} 
              items={availableModules}
              required
              placeholder="Select Module *"
            />
            {selectedModule && (
              <DropDown 
                value={selectedChapter} 
                onChange={setSelectedChapter} 
                items={chapters}
                required
                placeholder="Select Chapter *"
              />
            )}

            {(error || validationError) && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-sm text-red-400">{error || validationError}</div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">
                {loading ? t('quizGenerator.generatingButton') : t('quizGenerator.generateButton')}
              </span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </form>

        {mcqs.length > 0 && (
          <div className="mt-8 space-y-4">
            {mcqs}{/** create a button to take to the quiz */}
          </div>
        )}
      </div>
    </div>
  );
}