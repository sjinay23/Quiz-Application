import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import "./index.css";

const CategorySelection = lazy(() => import("./components/CategorySelection"));
const QuizPage = lazy(() => import("./components/QuizQuestion"));
const ScorePage = lazy(() => import("./components/ScorePage"));

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-40 text-gray-500">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<CategorySelection />} />
              <Route path="/quiz/:categoryId" element={<QuizPage />} />
              <Route path="/score" element={<ScorePage />} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
