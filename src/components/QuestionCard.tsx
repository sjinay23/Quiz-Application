import type { Question } from "../types/quiz";

interface QuestionCardProps {
  question: Question;
  selectedIndex: number | null;
  onSelect: (idx: number) => void;
}

export default function QuestionCard({
  question,
  selectedIndex,
  onSelect,
}: QuestionCardProps) {
  const getOptionClasses = (isSelected: boolean) =>
    `w-full text-left rounded-xl border px-4 py-4 flex items-center gap-3 cursor-pointer transition
     ${
       isSelected
         ? "border-pink-600 bg-pink-50 ring-2 ring-pink-300"
         : "border-gray-300 bg-white hover:bg-gray-50"
     }`;

  const getIndicatorClasses = (isSelected: boolean) =>
    `mr-3 flex items-center justify-center rounded-full border w-6 h-6 ${
      isSelected ? "border-pink-600 bg-pink-600" : "border-gray-400 bg-white"
    }`;

  const getTextClasses = (isSelected: boolean) =>
    `font-medium ${isSelected ? "text-pink-700" : "text-gray-800"}`;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-8">
      <div className="text-lg font-semibold text-gray-900 mb-4">
        {question.question}
      </div>

      <div className="flex flex-col gap-4">
        {question.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(idx)}
              className={getOptionClasses(isSelected)}
              aria-pressed={isSelected}
            >
              <span className={getIndicatorClasses(isSelected)}>
                {isSelected && (
                  <span className="w-3 h-3 bg-white rounded-full block"></span>
                )}
              </span>
              <span className={getTextClasses(isSelected)}>{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
