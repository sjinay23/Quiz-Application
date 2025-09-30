import React from "react";

type QuizRule = {
  title: string;
  items: (string | string[])[];
};

type Props = {
  rules: QuizRule[];
};

const QuizRules: React.FC<Props> = ({ rules }) => (
  <div className="p-4 sm:p-6 rounded-xl  max-w-full sm:max-w-lg mx-4 sm:mx-auto">
    <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-900">
      Quiz rules
    </h2>
    {rules.map((section, idx) => (
      <div key={idx} className="mb-4 sm:mb-6">
        <h3 className="font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
          {section.title}
        </h3>
        <ul className="ml-4 list-disc text-gray-600 space-y-1 text-xs sm:text-sm">
          {section.items.map((item, i) =>
            Array.isArray(item) ? (
              <ul key={i} className="ml-4 list-[circle]">
                {item.map((subitem, j) => (
                  <li key={j}>{subitem}</li>
                ))}
              </ul>
            ) : (
              <li key={i}>{item}</li>
            )
          )}
        </ul>
      </div>
    ))}
  </div>
);

export default QuizRules;
