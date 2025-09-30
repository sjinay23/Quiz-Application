import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../data/questions";
import { quizRulesData } from "../../data/rules";
import QuizRules from "./QuizRule";

export default function CategorySelection() {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [showRules, setShowRules] = useState(false);

  const nav = useNavigate();

  const handleStart = () => {
    if (!name || !selected) return;
    nav(`/quiz/${selected}`, { state: { name } });
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4">
      <div className="rounded-2xl p-8 w-full max-w-xl space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Welcome to <span className="text-pink-600 font-bold">QUIZMania</span>
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Please read all the rules about this quiz before you start.
        </p>
        <button
          onClick={() => setShowRules((prev) => !prev)}
          className="text-pink-600 text-sm font-medium hover:underline mt-1"
        >
          Quiz rules
        </button>

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <p>Please select topic to continue</p>
        <div className="space-y-4">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`w-full text-left rounded-xl border transition-all duration-150 px-4 py-4 flex items-center gap-3 ${
                selected === c.id
                  ? "border-pink-600 bg-pink-50 ring-2 ring-pink-300"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <button
          disabled={!name || !selected}
          onClick={handleStart}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            name && selected
              ? "bg-pink-600 hover:bg-pink-700"
              : "bg-pink-300 cursor-not-allowed"
          }`}
        >
          Start Quiz
        </button>

        {showRules && <QuizRules rules={quizRulesData} />}
      </div>
    </main>
  );
}
