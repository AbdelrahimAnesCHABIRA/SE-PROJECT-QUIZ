const mongoose = require('mongoose');
const Question = require('./models/Question');

const questionsData = [
  // القواعد النحوية
  {
    chapterId: "67814a0fa6f0427798c392a3", // القواعد النحوية
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
