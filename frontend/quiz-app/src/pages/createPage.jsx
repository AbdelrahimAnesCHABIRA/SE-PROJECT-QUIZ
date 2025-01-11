import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SearchBar } from "../components/Explorer/SearchBar";
import { Pagination } from "../components/Pagination/Pagination";
import { FilterButton } from "../components/Filters/FilterButton";
import { FilterPanel } from "../components/Filters/FilterPanel";
import { useFilters } from "../hooks/useFilters";
import { Shuffle, Plus } from 'lucide-react';
import Spinner from "../components/spinner/Spinner";
import { fetchAllQuestions } from "../services/sectionDataService";
import { QuestionSelectionCard } from "../anescomponents/QuestionSelectionCard";
import InputField from "../anescomponents/InputField";
import Button from "../anescomponents/Button";
import { useQuizTemplate } from "../hooks/useQuizTemplate";
import { useQuiz } from "../hooks/useQuiz";
import { useQuestion } from "../hooks/useQuestion";
import axios from "axios";
import { Model } from "../components/Create/Model";
import { SelectSubject } from "../components/Create/SelectSubject";
import { Footer } from "../components/Layout/Footer";
import Navbar from "../components/NavBar";

export default function CreatePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createQuizTemplate } = useQuizTemplate();
  const [questions, setQuestions] = useState([]);
  const [questionStats, setQuestionStats] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    selectedSubjects: [],
    selectedChapters: [],
    selectedQuestionCount: [],
  });
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [randomQuestionCount, setRandomQuestionCount] = useState(0);
  const [childId, setChildId] = useState(null);
  const [studyLevel, setStudyLevel] = useState(null);
  const { fetchStats } = useQuiz();
  const { fetchChaptersIdByQuestionId } = useQuestion();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    const fetchChildIdFromSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/Child/session", {
          withCredentials: true, // Ensure cookies are sent
        });
        setChildId(res.data.childId);
        setStudyLevel(res.data.studyLevel);
      } catch (err) {
        console.error("Error fetching childId from session:", err);
      }
    };
    fetchChildIdFromSession();
  }, []);
  
  const {
    subjects,
    chapters,
    selectedSubjects,
    selectedChapters,
    selectedQuestionCount,
    onSubjectsChange,
    onChaptersChange,
    onQuestionCountChange,
    getSelectedFilterLabels,
  } = useFilters(studyLevel, childId);
  const displayItems = questions;
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const fetchPageData = async (page, searchQuery = "") => {
    setLoading(true);
    try {
      const response = await fetchAllQuestions(
        studyLevel,
        page,
        activeFilters,
        24,
        searchQuery
      );
      setQuestions(response.data);
      setTotalItems(response.total);
      setTotalPages(response.totalPages); // Store totalPages from response
  
      if (response.data.length > 0) {
        const stats = await fetchStats(response.data, childId);
        setQuestionStats(stats);
      }
    } catch (error) {
      console.error("Failed to fetch questions or stats:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPageData(currentPage, query);
    }, 300);
  
    return () => clearTimeout(delayDebounceFn);
  }, [query, currentPage, activeFilters, childId]);
  
  const handleApplyFilters = (filters) => {
    setActiveFilters({
      selectedSubjects: filters.selectedSubjects || [],
      selectedChapters: filters.selectedChapters || [],
      selectedQuestionCount: filters.selectedQuestionCount || [],
    });
    setHasAppliedFilters(true);
    handlePageChange(1);
  };
  const toggleQuestionSelection = (questionId) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };
  
  const randomizeQuestions = () => {
    if (randomQuestionCount <= 0 || randomQuestionCount > questions.length) {
      alert(t('create.enterQuestionCount') + ` (1-${questions.length})`);
      return;
    }
  
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const randomizedSelection = shuffled
      .slice(0, randomQuestionCount)
      .map((q) => q._id);
    setSelectedQuestions(randomizedSelection);
  };
  const startQuiz = async (value) => {
    if (selectedQuestions.length === 0) {
      alert(t('create.selectAtLeastOne'));
      return;
    }
  
    try {
      // Get chapters either from active filters or fetch from selected questions
      let chaptersForQuiz = activeFilters.selectedChapters;
      if (chaptersForQuiz.length === 0) {
        console.log("Fetching chapters from selected questions");
        console.log("Selected questions:", selectedQuestions);
        const chaptersFromQuestions = await fetchChaptersIdByQuestionId(
          selectedQuestions
        );
        chaptersForQuiz = [...new Set(chaptersFromQuestions)]; // Remove duplicates
        console.log("Chapters from questions:", chaptersForQuiz);
      }
  
      const quizTemplatePayload = {
        title: value || t('create.untitledQuiz'),
        module: activeFilters.selectedSubjects[0]._id,
        child: childId,
        questions: selectedQuestions,
        chapters: chaptersForQuiz,
        imageUrl: activeFilters.selectedSubjects[0].imageUrl
          ? activeFilters.selectedSubjects[0].imageUrl
          : "data:image/jpeg;base64,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",
      };
  
      const quizTemplate = await createQuizTemplate(quizTemplatePayload);
  
      if (!quizTemplate) {
        throw new Error("Failed to create QuizTemplate");
      }
  
      const selectedQuestionsData = questions.filter((q) =>
        selectedQuestions.includes(q._id)
      );
  
      navigate("/quiz", {
        state: {
          questions: selectedQuestionsData,
          quizTemplate_id: quizTemplate._id,
        },
      });
    } catch (err) {
      console.error("Failed to start quiz:", err);
      alert(t('create.failedToStart'));
    }
  };
  
  const finalTotalPages = totalPages || Math.ceil(totalItems / 24);

  return (

   <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
    <Navbar/>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t("createPage.title")}

          </h1>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center w-full">
              <SearchBar
                value={query}
                onChange={(newQuery) => {
                  setQuery(newQuery);
                  setCurrentPage(1);
                }}
                isSearching={isSearching}
                placeholder={t("explorer.searchPlaceholder")}
                className="flex-grow"
              />
              <FilterButton
                onClick={() => setIsFilterOpen(true)}
                isOpen={isFilterOpen}
                selectedFilters={getSelectedFilterLabels()}
              />
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            <InputField
              label={t('createPage.enterQuestionCount')}
              onChange={(e) => setRandomQuestionCount(parseInt(e.target.value, 10) || 0)}
              placeholder={`1-${questions.length}`}
              type="number"
              value={randomQuestionCount}
              htmlFor="number-of-questions"
            />
            <Button
              onclick={randomizeQuestions}
              text={t('createPage.randomize')}
              icon={Shuffle}
              className="h-[46px]"
            />
            <Button
              onclick={() => setIsModalOpen(true)}
              text={t('createPage.createQuiz')}
              icon={Plus}
              disabled={!hasAppliedFilters && selectedQuestions.length === 0}
              className="h-[46px]"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {selectedSubjects.length === 0 ? (
            <SelectSubject />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {loading ? (
                  <div className="col-span-full flex justify-center py-12">
                    <Spinner />
                  </div>
                ) : displayItems.length > 0 ? (
                  displayItems.map((q, idx) => {
                    const stats = questionStats.find((stat) => stat.questionId === q._id) || {};
                    return (
                      <QuestionSelectionCard
                        key={idx}
                        questionText={q.questionText}
                        stats={stats}
                        isSelected={selectedQuestions.includes(q._id)}
                        onToggle={() => toggleQuestionSelection(q._id)}
                      />
                    );
                  })
                ) : (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    {t('createPage.noItemsFound')}
                  </div>
                )}
              </div>
            </>
          )}
          
          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={finalTotalPages}
              onPageChange={handlePageChange}
              isSearching={isSearching || loading}
            />
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        subjects={subjects}
        selectedSubjects={selectedSubjects}
        onSubjectsChange={onSubjectsChange}
        chapters={chapters}
        selectedChapters={selectedChapters}
        onChaptersChange={onChaptersChange}
        questionCount={selectedQuestionCount}
        onQuestionCountChange={onQuestionCountChange}
        onApplyFilters={handleApplyFilters}
      />

      {/* Create Quiz Modal */}
      <Model
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(value) => startQuiz(value)}
      />
      <div className="mt-6">
        <Footer />
      </div>
    </div>
  );
}