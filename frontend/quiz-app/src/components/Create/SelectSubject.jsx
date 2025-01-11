import React from 'react';

export function SelectSubject() {
  return (
    <div
      dir="rtl"
      className="flex flex-col items-center justify-center w-full p-4 bg-white rounded-2xl shadow-lg"
    >
      <div className="w-32 h-32 mb-4">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-blue-600"
        >
          <path
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-current"
          />
          <circle
            cx="12"
            cy="12"
            r="3"
            className="fill-current animate-pulse"
          />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-blue-900 mb-2 text-center font-arabic">
        الرجاء اختيار المادة
      </h2>

      <p className="text-blue-700 text-center max-w-md font-arabic mb-4">
        اختر مادة من القائمة لعرض الأسئلة المتاحة وابدأ رحلة التعلم الخاصة بك
      </p>
    </div>
  );
}