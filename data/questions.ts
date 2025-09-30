import type { Category } from "../src/types/quiz";

export const categories: Category[] = [
  {
    id: "js-basics",
    name: "JavaScript Basics",
    questions: [
      {
        id: "q1",
        question: "Which method converts JSON text to a JavaScript object?",
        options: [
          "JSON.toObj()",
          "JSON.parse()",
          "JSON.stringify()",
          "JSON.convert()",
        ],
        correctAnswer: "B", // Corresponding to "JSON.parse()"
        timeLimit: 10,
      },
      {
        id: "q2",
        question: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "function", "const"],
        correctAnswer: "B", // Corresponding to "let"
        timeLimit: 10,
      },
    ],
  },
  {
    id: "angular-basics",
    name: "Angular Basics",
    questions: [
      {
        id: "q3",
        question: "Which decorator is used to define an Angular component?",
        options: ["@Injectable", "@Component", "@NgModule", "@Directive"],
        correctAnswer: "B",
        timeLimit: 10,
      },
      {
        id: "q4",
        question: "What is the purpose of Angular's NgModule?",
        options: [
          "To create services",
          "To define a module for components, pipes, and services",
          "To bootstrap the application",
          "To add routing",
        ],
        correctAnswer: "B",
        timeLimit: 10,
      },
    ],
  },
  {
    id: "react-adv",
    name: "React.js Advance",
    questions: [
      {
        id: "q5",
        question:
          "Which hook lets you run side-effects in function components?",
        options: ["useState", "useReducer", "useEffect", "useMemo"],
        correctAnswer: "C",
        timeLimit: 10,
      },
      {
        id: "q6",
        question: "What does React's useMemo hook do?",
        options: [
          "Memoizes a value for performance optimization",
          "Manages state",
          "Runs side-effects",
          "Handles context",
        ],
        correctAnswer: "A",
        timeLimit: 10,
      },
    ],
  },
  {
    id: "flutter",
    name: "Flutter",
    questions: [
      {
        id: "q7",
        question:
          "Which widget is used for creating a scrolling list in Flutter?",
        options: ["Container", "ListView", "Column", "Row"],
        correctAnswer: "B",
        timeLimit: 10,
      },
      {
        id: "q8",
        question: "What language is primarily used to write Flutter apps?",
        options: ["Java", "Kotlin", "Dart", "Swift"],
        correctAnswer: "C",
        timeLimit: 10,
      },
    ],
  },
];
