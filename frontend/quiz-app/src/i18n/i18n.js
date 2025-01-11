import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const translations = {
  "sidebar": {
    "basic": "أساسي",
    "create": "إنشاء",
    "menu": {
      "explorer": "المستكشف",
      "archive": "الأرشيف",
      "reports": "التقارير",
      "classes": "الفصول",
      "hosting": "الاستضافة",
      "ai": "الذكاء الاصطناعي"
    }
  },
  "explorer": {
    "title": "المستكشف",
    "searchPlaceholder": "البحث في المستكشف",
    "filterByDate": "تصفية حسب التاريخ",
    "emptyStateTitle": "كل شيء يتعلق بالبيانات!",
    "emptyStateDescription": "نظم لعبة للاطلاع على المحتوى هنا.",
    "emptyStateAlt": "رسم توضيحي للمستكشف",
    "goToLibrary": "الذهاب إلى المكتبة",
    "seeAll": "عرض الكل",
    "recentActivity": "النشاط الأخير",
    "trending": "الأكثر شيوعاً",
    "newContent": "محتوى جديد",
    "allItems": "جميع العناصر",
    "resultsFound": "تم العثور على ",
    "searchResults": " نتائج البحث عن ",
    "noResults": "لا توجد نتائج",
    "tryDifferentSearch": "جرب بحثًا مختلفًا",
  },
  "footer": {
    "about": "حول",
    "contact": "اتصل بنا",
    "terms": "الشروط",
    "privacy": "الخصوصية",
    "help": "المساعدة",
    "social": "التواصل الاجتماعي",
    "rights": "جميع الحقوق محفوظة",
    "community": "المجتمع",
    "support": "الدعم",
    "aboutUs": "من نحن",
    "blog": "المدونة",
    "careers": "الوظائف",
    "legal": "قانوني",
    "copyright": "حقوق",
  },
  "createPage":{
    "title": "إنشاء",
    "createQuiz": "إنشاء اختبار",
    "randomize": "عشوائي",
    "enterQuestionCount": "أدخل عدد الأسئلة",
    "noItemsFound": "لا توجد عناصر",
    
  },
  "filters": {
    "title": "تصفية",
    "subjects": "المواد",
    "selectSubjects": "المواد المختارة",
    "selectChapters": " الفصل المختار",
    "apply": "تطبيق",
    "clearAll": "مسح الكل",
    "chapters": "الفصول",
    "questionCount": "عدد الأسئلة",
    "selectQuestionCount": "اختر عدد الأسئلة",

  },
  "pagination": {
    "previous": "السابق",
    "next": "التالي"
  },
    "archive":{
      "title": "الأرشيف",
      "filter": "تصفية",
      "noQuizzes": "لا توجد اختبارات",
      "startQuiz": "ابدأ الاختبار",
      "subjects": "المواد",
      "dateRange": "نطاق التاريخ",
      "selectSubjects": "اختر المواد",
      "scoreRange": "نطاق الدرجات",
      "clearFilters": "مسح التصفية",
      "applyFilters": "تطبيق التصفية",
    },
    "quizGenerator":{
      "title": "مولد الاختبار بالذكاء الاصطناعي",
      "subtitle": "احصل على اختبار مخصص لك",
      "uploadLabel" :"ارفع ملفك",
      "uploadButton": "رفع",
      "quizNameLabel": "اسم الاختبار",
      "questionsLabel": "عدد الأسئلة",
      "generateButton": "إنشاء",
    },
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: translations }
    },
    lng: 'ar',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    },
  });

document.dir = 'rtl';

export default i18n;