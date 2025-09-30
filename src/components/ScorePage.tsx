import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Question } from "../types/quiz";

interface LocationState {
  answers: {
    questionId: string;
    selectedIndex: number | null;
    timedOut: boolean;
  }[];
  questions: Question[];
}

export default function ScorePage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: LocationState };

  const questions = useMemo(() => state?.questions ?? [], [state?.questions]);
  const answers = useMemo(() => state?.answers ?? [], [state?.answers]);

  // Helper: Convert letter (A/B/C/...) to index
  const letterToIndex = (letter: string) =>
    letter.charCodeAt(0) - "A".charCodeAt(0);

  const { correctCount, incorrectCount, unansweredCount, total } =
    useMemo(() => {
      let correct = 0;
      let incorrect = 0;
      let unanswered = 0;

      questions.forEach((q) => {
        const answer = answers.find((a) => a.questionId === q.id);
        if (!answer || answer.selectedIndex === null) {
          unanswered++;
        } else if (answer.selectedIndex === letterToIndex(q.correctAnswer)) {
          correct++;
        } else {
          incorrect++;
        }
      });

      return {
        correctCount: correct,
        incorrectCount: incorrect,
        unansweredCount: unanswered,
        total: questions.length,
      };
    }, [answers, questions]);

  const scorePercent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  const feedback = useMemo(() => {
    if (scorePercent >= 80) return "Great job!";
    if (scorePercent >= 60) return "Well done!";
    return "";
  }, [scorePercent]);

  return (
    <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow text-center space-y-8">
      {/* Checkmark Icon */}
      <div className="mx-auto w-14 h-14 rounded-full bg-green-200 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Congratulation Text */}
      <h1 className="tracking-widest text-gray-800 text-xl font-light mb-1">
        {scorePercent >= 60 ? "CONGRATULATIONS" : "KEEP PRACTICING!"}
      </h1>
      <p className="text-gray-700 font-semibold text-sm">
        You successfully completed the quiz
      </p>

      {/* Score */}
      <div>
        <p className="text-gray-800 text-xl font-medium mb-2">Your Score</p>
        <p className="text-green-700 text-5xl font-extrabold">
          {scorePercent}%
        </p>
        <p className="text-indigo-900 text-2xl font-semibold mt-2">
          {feedback}
        </p>
      </div>

      {/* Details */}
      <div className="text-gray-700 font-medium text-sm">
        Out of {total} question{total > 1 ? "s" : ""}
        <div className="mt-3 flex justify-center gap-6 text-sm font-normal">
          <span className="text-green-700">{correctCount} Correct</span>
          <span className="text-red-700">{incorrectCount} Incorrect</span>
          <span className="text-gray-500">{unansweredCount} Not answered</span>
        </div>
      </div>

      {/* Retake Quiz Button */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 border border-indigo-400 rounded-md text-indigo-500 font-semibold hover:bg-indigo-50 transition"
      >
        Retake Quiz
      </button>
    </div>
  );
}
