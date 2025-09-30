import type { QuizRule } from "../src/types/quiz";

export const quizRulesData: QuizRule[] = [
  {
    title: "10-Second Timer",
    items: [
      "Each question comes with a 10-second timer.",
      "If you don't answer within the time limit, the app will automatically move to the next question.",
    ],
  },
  {
    title: "Manual Navigation",
    items: [
      "You can navigate to the next question manually before the timer expires.",
      'Use the "Next" button to move ahead if you\'re ready before the timer runs out.',
    ],
  },
  {
    title: "Final Score and Performance Message",
    items: [
      "After all questions are answered, your final score will be displayed.",
      "Based on your performance, you will receive a personalized message:",
      [
        "Great job!: If you score above 80%.",
        "Well done!: If you score between 60% and 80%.",
        "Keep practicing!: If you score below 60%.",
      ],
    ],
  },
];
