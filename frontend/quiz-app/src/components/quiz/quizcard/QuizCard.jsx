
import { GraduationCap, Trophy,RotateCw} from "lucide-react";
import { CircularProgress } from "./CircularProgress";
import { Badge } from "./Badge";

export const QuizCard = ({
  id,
  title,
  totalQuestions,
  answeredQuestions,
  imageUrl,
  year,
  className,
  playCount,
  onClick
}) => {

  const progress = (answeredQuestions / totalQuestions) * 100;
  const hasStarted = answeredQuestions > 0;
  const isCompleted = playCount > 1;

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col ${
        isCompleted ? "ring-2 ring-green-500 ring-offset-2" : ""
      } ${className || ""}`}
    >
      <div className="relative h-48 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 ${
            isCompleted ? "from-green-900/60" : ""
          }`}
        />
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {isCompleted && (
            <Badge variant="success" className="animate-pulse">
              <Trophy size={12} className="mr-1" /> انتهىx2
              {/*add the number of completations*/}
            </Badge>
          )}
          <Badge variant="secondary">{totalQuestions} الاسئلة</Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-xl text-right font-bold text-white mb-2 line-clamp-2">
            {title}
          </h3>
          {year && (
            <div className="flex  items-center text-white/90 text-sm">
              
              <GraduationCap size={16} className="ml-2" />
              {className} {/*Replace this with the subject name*/}
            </div>
          )}
        </div>
      </div>
      <div
        className={`p-4 flex-1 flex items-center ${
          isCompleted
            ? "bg-gradient-to-r from-green-50 to-emerald-50"
            : "bg-gradient-to-r from-blue-50 to-indigo-50"
        }`}
      >
        {isCompleted ? (
          <div className="flex items-center gap-3 w-full">
            
            <div className="flex-1">
              <span className="text-sm text-green-600 font-medium block text-right">
                !تهانينا{" "}
              </span>
              <div className="font-semibold text-gray-900 text-right">
                تم الانتهاء من الاختبار
              </div>
            </div>
            <button
              onClick={() => {}}
              className="group/button flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition-all duration-300 z-10"
            >
              <RotateCw
                size={16}
                className="group-hover/button:rotate-180 transition-transform duration-500"
              />
            إعادة الاختبار
            </button>
          </div>
        ) : hasStarted ? (
          <div className="flex justify-end items-center gap-3 w-full">
            <div className="flex-col">
              <span className="text-sm text-gray-600 block text-right">
                التقدم
              </span>
              <div className="font-semibold text-gray-900 text-right ">
               من اصل {totalQuestions} تم الاجابة على {answeredQuestions}
              </div>
            </div>
            <CircularProgress
              percentage={Math.floor(progress)}
              size={50}
              strokeWidth={3}
              className="transform group-hover:scale-110 transition-transform duration-300 shrink-0"
            />
          </div>
        ) : (
          <div className="flex justify-between items-center gap-3 w-full">
            <div className=" flex-col items-end">
              <span className="text-sm text-gray-600 block text-right">
                جاهز للبدأ
              </span>
              <div className="font-semibold text-gray-900 text-right">
                إبدأ الاختبار
              </div>
            </div>
            <div className="w-[50px] h-[50px] rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Badge variant="secondary" className="bg-white">
                جديد
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
