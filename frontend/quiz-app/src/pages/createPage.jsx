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
          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
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
    </div>
  );
}