const mongoose = require('mongoose');
const Question = require('./models/Question');

const questionsData = [
  // القواعد النحوية
  {
    chapterId: "676d899794f67ca080588b3f", // القواعد النحوية
    questions: [
      {
        questionText: "ما هو الفاعل في الجملة: ذهب أحمد إلى المدرسة؟",
        correctAnswer: "أحمد",
        falseOptions: ["ذهب", "المدرسة", "إلى"],
        explanation: "الفاعل هو الشخص أو الشيء الذي قام بالفعل، وفي هذه الجملة الفاعل هو أحمد.",
      },
      {
        questionText: "ما نوع الجملة: الكتاب مفيد؟",
        correctAnswer: "جملة اسمية",
        falseOptions: ["جملة فعلية", "جملة شرطية", "جملة استفهامية"],
        explanation: "الجملة تبدأ باسم، لذا فهي جملة اسمية.",
      },
      {
        questionText: "ما هو المفعول به في الجملة: قرأ الطالب الكتاب؟",
        correctAnswer: "الكتاب",
        falseOptions: ["الطالب", "قرأ", "في"],
        explanation: "المفعول به هو الشيء الذي وقع عليه الفعل، وهو الكتاب في هذه الجملة.",
      },
      {
        questionText: "ما هو الحال في الجملة: عاد الطالب مسرعًا؟",
        correctAnswer: "مسرعًا",
        falseOptions: ["عاد", "الطالب", "إلى البيت"],
        explanation: "الحال يصف هيئة الفاعل أو المفعول به عند حدوث الفعل، وهو مسرعًا في هذه الجملة.",
      },
      {
        questionText: "ما نوع المبتدأ في الجملة: الطالب مجتهد؟",
        correctAnswer: "اسم معرف",
        falseOptions: ["اسم نكرة", "ضمير", "فعل"],
        explanation: "المبتدأ في هذه الجملة هو اسم معرف (الطالب).",
      },
      {
        questionText: "ما هو النعت في الجملة: قرأت كتابًا ممتعًا؟",
        correctAnswer: "ممتعًا",
        falseOptions: ["قرأت", "كتابًا", "في المكتبة"],
        explanation: "النعت يصف الاسم الذي قبله، وهو ممتعًا في هذه الجملة.",
      },
      {
        questionText: "ما هو المجرور في الجملة: ذهبت إلى السوق؟",
        correctAnswer: "السوق",
        falseOptions: ["ذهبت", "إلى", "البيت"],
        explanation: "المجرور هو الاسم الذي يأتي بعد حرف الجر، وهو السوق في هذه الجملة.",
      },
      {
        questionText: "ما هو حرف العطف في الجملة: جاء أحمد ومحمد؟",
        correctAnswer: "و",
        falseOptions: ["جاء", "أحمد", "محمد"],
        explanation: "حرف العطف هو الذي يربط بين الكلمات، وهو (و) في هذه الجملة.",
      },
      {
        questionText: "ما هو نوع الضمير في الجملة: نحن نحب المدرسة؟",
        correctAnswer: "ضمير متصل",
        falseOptions: ["ضمير منفصل", "اسم إشارة", "اسم موصول"],
        explanation: "الضمير (نحن) هو ضمير متصل.",
      },
      {
        questionText: "ما هو الاسم الموصول في الجملة: هذا هو الطالب الذي نجح؟",
        correctAnswer: "الذي",
        falseOptions: ["هذا", "الطالب", "نجح"],
        explanation: "الاسم الموصول يربط الجملة الفرعية بالجملة الرئيسية، وهو (الذي) في هذه الجملة.",
      },
    ],
  },
  // القراءة والنصوص
  {
    chapterId: "676d899794f67ca080588b40",
    questions: [
      {
        questionText: "ما هي الفكرة الرئيسية في النص: 'الصداقة كنز لا يفنى'؟",
        correctAnswer: "أهمية الصداقة في الحياة",
        falseOptions: ["الصداقة والحب", "كيفية اختيار الأصدقاء", "مساعدة الأصدقاء"],
        explanation: "النص يركز على قيمة الصداقة وأهميتها ككنز في حياة الإنسان.",
      },
      {
        questionText: "ما هو المغزى من القصة: 'النملة والصرصور'؟",
        correctAnswer: "العمل الجاد والاستعداد للمستقبل",
        falseOptions: ["التعاون بين الأصدقاء", "أهمية المرح", "القناعة بما تملك"],
        explanation: "القصة تعلمنا أهمية العمل والاجتهاد بدلاً من التهاون والكسل.",
      },
      {
        questionText: "ما نوع النص التالي: 'كان يا ما كان في قديم الزمان'؟",
        correctAnswer: "نص قصصي",
        falseOptions: ["نص شعري", "نص معلوماتي", "نص وصفي"],
        explanation: "النص يبدأ بأسلوب سردي يشير إلى قصة خيالية.",
      },
      {
        questionText: "ما هي السمة الأدبية التي تظهر في النص: 'الليل كالحلم الجميل'؟",
        correctAnswer: "التشبيه",
        falseOptions: ["الاستعارة", "الكناية", "المجاز"],
        explanation: "التشبيه يستخدم كلمات مثل 'كـ' لتقريب المعنى، كما في 'كالحلم الجميل'.",
      },
      {
        questionText: "ما هو الهدف من النص: 'حافظ على البيئة'؟",
        correctAnswer: "التوعية بأهمية حماية البيئة",
        falseOptions: ["تعليم زراعة الأشجار", "التشجيع على إعادة التدوير فقط", "تنظيف المدن"],
        explanation: "النص يدعو إلى الوعي البيئي من خلال حماية البيئة بطرق شاملة.",
      },
      {
        questionText: "ما نوع العاطفة التي تظهر في النص: 'الأم هي الحنان والعطاء'؟",
        correctAnswer: "عاطفة الحب والتقدير",
        falseOptions: ["عاطفة الحزن", "عاطفة الغضب", "عاطفة الخوف"],
        explanation: "النص يعبر عن حب الأم وتقدير دورها في العطاء والحنان.",
      },
      {
        questionText: "ما هو الغرض من استخدام الحوار في النصوص القصصية؟",
        correctAnswer: "إبراز شخصيات القصة وتطور الأحداث",
        falseOptions: ["إطالة النص", "إضافة تفاصيل غير مهمة", "ملء الفراغات"],
        explanation: "الحوار يساعد على توضيح شخصيات القصة وجعل الأحداث أكثر تفاعلًا.",
      },
      {
        questionText: "ما هو البيت الشعري الذي يعبر عن قيمة العمل؟",
        correctAnswer: "إذا غامرتَ في شرفٍ مرومِ فلا تقنعْ بما دونَ النجومِ",
        falseOptions: [
          "ومن يتهيبْ صعودَ الجبالِ يعشْ أبدَ الدهرِ بينَ الحفرِ",
          "لا تسألْ الطيرَ كيفَ يغني، واسألْ الزهرَ كيفَ يتفتحُ",
          "وللأوطانِ في دمِ كلِّ حرٍّ يدٌ سلفتْ ودَينٌ مستحقُّ",
        ],
        explanation: "البيت الشعري يشير إلى الطموح والعمل الجاد لتحقيق الأهداف.",
      },
      {
        questionText: "ما هو نوع السرد في النص: 'وقفت الشمسُ لتودع الأفق بحزن'؟",
        correctAnswer: "سرد وصفي",
        falseOptions: ["سرد قصصي", "سرد معلوماتي", "سرد تحليلي"],
        explanation: "النص يصف منظرًا طبيعيًا بأسلوب شعري.",
      },
      {
        questionText: "ما هي الفائدة من القراءة بصوت عالٍ؟",
        correctAnswer: "تحسين النطق وزيادة الفهم",
        falseOptions: [
          "تسريع القراءة فقط",
          "إضافة نبرة صوت جميلة",
          "إظهار مهارات القراءة أمام الآخرين",
        ],
        explanation: "القراءة بصوت عالٍ تساعد في تحسين النطق وتعزيز استيعاب النصوص.",
      },
    ],
  },
  // الإملاء والتعبير
  {
    chapterId: "676d899794f67ca080588b41",
    questions: [
      {
        questionText: "ما هو الحرف الناقص في كلمة 'مـرسة'؟",
        correctAnswer: "د",
        falseOptions: ["ب", "ف", "ج"],
        explanation: "الكلمة الصحيحة هي 'مدرسة'.",
      },
      {
        questionText: "ما هو الفرق بين 'البيت' و'بيت'؟",
        correctAnswer: "الأول معرف والثاني نكرة",
        falseOptions: ["الأول فعل والثاني اسم", "كلاهما اسم معرف", "كلاهما نكرة"],
        explanation: "'البيت' معرف بأل التعريف، و'بيت' نكرة.",
      },
      // Add 8 more questions...
    ],
  },
  // الجمع والطرح
  {
    chapterId: "676d899794f67ca080588b42",
    questions: [
      {
        questionText: "ما هو حاصل جمع 12 و15؟",
        correctAnswer: "27",
        falseOptions: ["25", "26", "28"],
        explanation: "جمع 12 و15 يعطينا 27.",
      },
      {
        questionText: "ما هو ناتج طرح 20 من 45؟",
        correctAnswer: "25",
        falseOptions: ["20", "15", "30"],
        explanation: "طرح 20 من 45 يعطينا 25.",
      },
      // Add 8 more questions...
    ],
  },
  // الضرب والقسمة
  {
    chapterId: "676d899794f67ca080588b43",
    questions: [
      {
        questionText: "ما هو حاصل ضرب 6 × 7؟",
        correctAnswer: "42",
        falseOptions: ["36", "48", "40"],
        explanation: "6 مضروبة في 7 تساوي 42.",
      },
      {
        questionText: "ما هو ناتج قسمة 24 ÷ 6؟",
        correctAnswer: "4",
        falseOptions: ["5", "3", "6"],
        explanation: "قسمة 24 على 6 تعطينا 4.",
      },
      // Add 8 more questions...
    ],
  },
  // الأشكال الهندسية
  {
    chapterId: "676d899794f67ca080588b44",
    questions: [
      {
        questionText: "ما هو عدد أضلاع المربع؟",
        correctAnswer: "4",
        falseOptions: ["3", "5", "6"],
        explanation: "المربع يحتوي على 4 أضلاع متساوية.",
      },
      {
        questionText: "ما هو الشكل الذي يحتوي على 3 أضلاع؟",
        correctAnswer: "مثلث",
        falseOptions: ["مربع", "مستطيل", "دائرة"],
        explanation: "الشكل ذو 3 أضلاع هو المثلث.",
      },
      // Add 8 more questions...
    ],
  },
];


const seedQuestions = async () => {
  try {
    for (const { chapterId, questions } of questionsData) {
      for (const question of questions) {
        const questionData = new Question({
          chapterId,
          questionText: question.questionText,
          correctAnswer: question.correctAnswer,
          falseOptions: question.falseOptions,
          explanation: question.explanation,
        });
        await questionData.save();
      }
    }
    console.log('Questions have been seeded successfully.');
  } catch (error) {
    console.error('Error seeding questions:', error);
  }
};

module.exports = seedQuestions;
