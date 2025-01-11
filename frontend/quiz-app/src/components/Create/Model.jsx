import React, { useState, useEffect } from 'react';

export function Model({ isOpen, onClose, onSubmit }) {
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSubmit(input);
    setInput('');
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0'
    }`}>
      <div 
        className="fixed inset-0 bg-grey-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={`relative transform transition-all duration-300 ${
        isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        <div dir="rtl" className="bg-white rounded-xl shadow-2xl w-[28rem] max-w-[90vw] p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-900 font-arabic">
            أدخل عنوان الاختبار
          </h2>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 rounded-lg border border-blue-200 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     bg-white text-blue-900
                     placeholder-blue-400
                     transition-colors duration-200
                     font-arabic text-right"
            placeholder="أدخل النص هنا..."
            autoFocus
          />
          <div className="flex justify-start gap-3 mt-8">
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       text-white rounded-lg shadow-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition-colors duration-200
                       font-arabic"
            >
              إرسال
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg text-blue-700
                       hover:bg-blue-50
                       focus:outline-none focus:ring-2 focus:ring-blue-400
                       transition-colors duration-200
                       font-arabic"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}