import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { MultiSelect } from "./MultiSelect";
import { useLocation } from "react-router-dom";

export const FilterPanel = ({
  isOpen,
  onClose,
  subjects,
  selectedSubjects,
  onSubjectsChange,
  chapters,
  selectedChapters,
  onChaptersChange,
  questionCount,
  onQuestionCountChange,
  onApplyFilters,
}) => {
  const handleApplyFilters = () => {

    onApplyFilters({
      selectedSubjects,
      selectedChapters,
      selectedQuestionCount: questionCount,
    });
    onClose();
  };
  const { t } = useTranslation();
  const location = useLocation();

  if (!isOpen) return null;

  const questionCountOptions = [
    { value: "1-10", label: "1-10" },
    { value: "11-20", label: "11-20" },
    { value: "21-30", label: "21-30" },
    { value: "30+", label: "30+" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
      <div
  className="absolute left-4 top-[72px] w-80 bg-white rounded-lg shadow-xl flex flex-col h-[60vh] overflow-hidden"
  onClick={(e) => e.stopPropagation()}
>
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{t("filters.title")}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("filters.subjects")}
            </label>
            <MultiSelect
              options={subjects}
              value={selectedSubjects}
              onChange={onSubjectsChange}
              placeholder={t("filters.selectSubjects")}
              isMulti={location.pathname === "/create" ? false : true}
            />
          </div>

          {selectedSubjects.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("filters.chapters")}
              </label>
              <MultiSelect
                options={chapters}
                value={selectedChapters}
                onChange={onChaptersChange}
                placeholder={t("filters.selectChapters")}
              />
            </div>
          )}
          {location.pathname !== "/create" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("filters.questionCount")}
              </label>
              <MultiSelect
                options={questionCountOptions}
                value={questionCount}
                onChange={onQuestionCountChange}
                placeholder={t("filters.selectQuestionCount")}
              />
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        <div className="flex justify-between p-4 border-t bg-white">
          <button
            onClick={() => {
              onSubjectsChange([]);
              onChaptersChange([]);
              onQuestionCountChange([]);
            }}
            className="text-gray-600 hover:text-gray-800"
          >
            {t("filters.clearAll")}
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover"
          >
            {t("filters.apply")}
          </button>
        </div>
      </div>
    </div>
  );
};
