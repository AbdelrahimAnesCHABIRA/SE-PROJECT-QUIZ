import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { ImageModal } from "./ImageModal";
import './MCQQuestion.css'; // Import the CSS file

export const MCQQuestion = ({
  question, // Contains _id, correctAnswer, falseOptions, text, hint
  handleScore,
  setIsAnswered,
}) => {
  const [showHint, setShowHint] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [scaleValue, setScaleValue] = useState(0);

  useEffect(() => {
    setShowHint(false);
    setShowOptions(false);
    setScaleValue(0);
    setIsAnswered(false); // Reset the answered state when the question changes
  }, [question._id]);

  const handleScaleSelect = (value) => {
    setScaleValue(value);
    setIsAnswered(true); // Mark as answered
    handleScore(value);
  };

  const handleHintClick = () => {
    setShowHint((prevShowHint) => !prevShowHint);
  };

  const handleShowOptions = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <div className="h-[89%] w-[98%] mx-auto space-y-6 overflow-y-auto custom-scrollbar">
      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Content Section */}
          <div className={`flex-1 order-2 md:order-1`}>
            {/* Question Header */}
            <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold text-gray-900 leading-relaxed">
                {question.questionText}
              </h2>
            </div>

            {/* Hint and Show Options Buttons */}
            <div className="flex gap-4 mb-6">
              {question.explanation && (
                <button
                  onClick={handleHintClick}
                  className={`
                    flex-1 p-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 
                    bg-blue-50 text-blue-600 hover:bg-blue-100
                  `}
                >
                  <HelpCircle size={16} />
                  {showHint ? "Hide Hint" : "Show Hint"}
                </button>
              )}

              <button
                onClick={handleShowOptions}
                className={`
                  flex-1 p-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 
                  bg-blue-50 text-blue-600 hover:bg-blue-100
                `}
              >
                {showOptions ? "Hide Options" : "Show Options"}
              </button>
            </div>

            {/* Hint Content */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-blue-50 rounded-lg text-blue-700 text-sm mb-6">
                    {question.explanation}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Image Section - Only render if image exists */}
          {question.imageUrl && (
            <div className="w-full md:w-72 order-1 md:order-2">
              <img
                src={question.imageUrl}
                alt="Question"
                className="w-full h-auto rounded-lg cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Options Grid */}
      {showOptions && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%] mx-auto">
          {[question.correctAnswer, ...question.falseOptions]?.map((option, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border-2 text-left min-h-[60px] flex items-center bg-gray-50 text-gray-500 border-gray-200"
            >
              <div className="text-lg font-medium">{option}</div>
            </div>
          ))}
        </div>
      )}

      {/* Scale Selection - Always Visible */}
      <div className="mt-6 w-[90%] mx-auto">
        <h3 className="text-lg font-medium mb-4">Rate the answer :</h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-8">
          {[...Array(5)].map((_, index) => (
            <motion.button
              key={index + 1}
              onClick={() => handleScaleSelect(index + 1)}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-lg border-2 ${
                scaleValue === index + 1
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              {index + 1}
            </motion.button>
          ))}
        </div>
      </div>

      <ImageModal
        imageUrl={question.imageUrl}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
    </div>
  );
};
