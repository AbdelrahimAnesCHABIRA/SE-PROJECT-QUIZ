import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SearchBar } from "../components/Explorer/SearchBar";
import { Pagination } from "../components/Pagination/Pagination";
import { FilterButton } from "../components/Filters/FilterButton";
import { FilterPanel } from "../components/Filters/FilterPanel";
import { useFilters } from "../hooks/useFilters";
import { useSearch } from "../hooks/useSearch";
import Spinner from "../components/spinner/Spinner";
import { fetchAllQuestions } from "../services/sectionDataService";
import { QuestionSelectionCard } from "../anescomponents/QuestionSelectionCard";
import { InputField } from "../anescomponents/InputField";
import Button from "../anescomponents/Button";
import { useQuizTemplate } from "../hooks/useQuizTemplate";
import { useQuiz } from "../hooks/useQuiz";
import { useQuestion } from "../hooks/useQuestion";
import { useChildSession } from "../hooks/useChildSession";
import axios from "axios";

export default function CreatePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
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
    query,
    setQuery,
    searchResults,
    isSearching,
    setItems: setSearchItems,
    currentPage,
    setCurrentPage,
    totalPages: searchTotalPages,
  } = useSearch([]);

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
  const displayItems = Array.isArray(query ? searchResults : questions)
    ? query
      ? searchResults
      : questions
    : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchPageData = async (page) => {
    setLoading(true);
    try {
      const response = await fetchAllQuestions(studyLevel, page, activeFilters, 24);
      setQuestions(response.data);
      setTotalItems(response.total);
      setSearchItems(response.data);

      // Fetch stats for the new questions immediately
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
    fetchPageData(currentPage);
  }, [currentPage, location.search, activeFilters, childId]);

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
      alert(`Please select a number between 1 and ${questions.length}`);
      return;
    }

    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const randomizedSelection = shuffled
      .slice(0, randomQuestionCount)
      .map((q) => q._id);
    setSelectedQuestions(randomizedSelection);
  };

  // useEffect(() => {
  //   if (selectedQuestions.length > 0) {
  //     fetchChaptersIdByQuestionId(selectedQuestions).then((chapters) => {
  //       setActiveFilters((prev) => ({
  //         ...prev,
  //         selectedChapters: [...new Set(chapters.map((c) => c.chapter_id))],
  //       }));
  //     });
  //   }
  // }, [selectedQuestions]);

  const startQuiz = async () => {
    if (selectedQuestions.length === 0) {
      alert("Please select at least one question to start the quiz.");
      return;
    }

    try {
      // Get chapters either from active filters or fetch from selected questions
      let chaptersForQuiz = activeFilters.selectedChapters;
      if (chaptersForQuiz.length === 0) {
        console.log("Fetching chapters from selected questions");
        console.log("Selected questions:", selectedQuestions);
        const chaptersFromQuestions = await fetchChaptersIdByQuestionId(selectedQuestions);
        chaptersForQuiz = [...new Set(chaptersFromQuestions)]; // Remove duplicates
        console.log("Chapters from questions:", chaptersForQuiz);
      }

      const quizTemplatePayload = {
        title: "Custom Quiz",
        module: activeFilters.selectedSubjects,
        child: childId,
        questions: selectedQuestions,
        chapters: chaptersForQuiz, // Use either selected chapters or fetched chapters
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
      alert("Failed to start quiz. Please try again later.");
    }
  };

  const finalTotalPages = query ? searchTotalPages : Math.ceil(totalItems / 24);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("explorer.allItems")}
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center w-full">
              <SearchBar
                value={query}
                onChange={setQuery}
                isSearching={isSearching}
                placeholder={t("explorer.searchPlaceholder")}
              />
              <FilterButton
                onClick={() => setIsFilterOpen(true)}
                isOpen={isFilterOpen}
                selectedFilters={getSelectedFilterLabels()}
              />
            </div>
            <div className="flex gap-4 items-center">
              <InputField
                label={"Enter the number of questions"}
                onChange={(e) =>
                  setRandomQuestionCount(parseInt(e.target.value, 10) || 0)
                }
                placeholder={`Enter a number (1-${questions.length})`}
                type="number"
                value={randomQuestionCount}
                htmlFor={"number of questions"}
              />
              <Button onclick={randomizeQuestions} text={"Randomize"} />
              <Button
                onclick={startQuiz}
                text={"Start Quiz"}
                disabled={!hasAppliedFilters && selectedQuestions.length === 0}
                className={
                  !hasAppliedFilters ? "opacity-50 cursor-not-allowed" : ""
                }
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            <Spinner />
          ) : displayItems.length > 0 ? (
            displayItems.map((q, idx) => {
              const stats =
                questionStats.find((stat) => stat.questionId === q._id) || {};
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
            <div className="col-span-full text-center text-gray-500">
              No items found
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={finalTotalPages}
          onPageChange={handlePageChange}
          isSearching={isSearching || loading}
        />

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
      </div>
    </div>
  );
}
