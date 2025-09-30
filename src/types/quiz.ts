export type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  timeLimit: number;
};

export type Category = {
  id: string;
  name: string;
  questions: Question[];
};

export type QuizRule = {
  title: string;
  items: (string | string[])[];
};
