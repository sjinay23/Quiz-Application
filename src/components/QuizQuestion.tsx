import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categories } from "../../data/questions";
import QuestionCard from "../components/QuestionCard";

type Answer = {
  questionId: string;
  selectedIndex: number | null;
  timedOut: boolean;
};

const DEFAULT_QUESTION_TIME = 10;

export default function QuizPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const { questions } = useMemo(() => {
    const cat = categories.find((c) => c.id === categoryId);
    return {
      category: cat,
      questions: cat?.questions ?? [],
    };
  }, [categoryId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [remaining, setRemaining] = useState(DEFAULT_QUESTION_TIME);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    setCurrentIndex(0);
    setRemaining(DEFAULT_QUESTION_TIME);
    setAnswers(
      questions.map((q) => ({
        questionId: q.id,
        selectedIndex: null,
        timedOut: false,
      }))
    );
  }, [questions]);

  useEffect(() => {
    if (!questions.length) return;

    setRemaining(questions[currentIndex]?.timeLimit ?? DEFAULT_QUESTION_TIME);

    const timer = setInterval(() => {
      setRemaining((r) => r - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, questions]);

  useEffect(() => {
    if (remaining <= 0) {
      handleSkip(true);
    }
  }, [remaining]);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion?.id
  );
  const selectedIndex = currentAnswer?.selectedIndex ?? null;

  const handleSelect = (optionIndex: number) => {
    const currentQId = questions[currentIndex].id;

    setAnswers((prev) =>
      prev.map((a) =>
        a.questionId === currentQId
          ? { ...a, selectedIndex: optionIndex, timedOut: false }
          : a
      )
    );

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setAnswers((prev) => {
        navigate("/score", { state: { answers: prev, questions } });
        return prev;
      });
    }
  };

  const handleSkip = (timedOut = false) => {
    setAnswers((prev) =>
      prev.map((a) =>
        a.questionId === currentQuestion.id
          ? { ...a, timedOut, selectedIndex: a.selectedIndex ?? null }
          : a
      )
    );

    goToNextQuestion();
  };

  const goToNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      navigate("/score", { state: { answers, questions } });
    }
  }, [currentIndex, navigate, answers, questions]);

  const handleNextClick = () => {
    handleSkip(false);
  };

  if (!questions.length) {
    return (
      <div className="text-center p-6">
        <p>No questions found for this category.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 underline text-pink-600"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div>
          Question {currentIndex + 1} / {questions.length}
        </div>
        <div>{remaining}s</div>
      </div>

      <QuestionCard
        question={currentQuestion}
        onSelect={handleSelect}
        selectedIndex={selectedIndex}
      />

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleNextClick}
          className="bg-pink-600 text-white px-6 py-2 rounded disabled:opacity-50"
          disabled={selectedIndex !== null}
        >
          Next
        </button>
        <button
          onClick={() => handleSkip(false)}
          className="border border-pink-600 text-pink-600 px-6 py-2 rounded"
        >
          Skip this question
        </button>
      </div>
    </div>
  );
}
