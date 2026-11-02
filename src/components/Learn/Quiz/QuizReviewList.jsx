import { isCorrect, describeAnswer, describeCorrect } from "../../../utils/utils";

const QuizReviewList = ({ quiz, answers, showCorrect }) => {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 text-left">
      <h3 className="mb-4 text-sm font-semibold text-white">Your answers</h3>
      {quiz.questions.map((q, idx) => {
        const right = isCorrect(q, answers[q.id]);
        return (
          <div key={q.id} className="mb-5 last:mb-0">
            <p className="mb-2 text-sm text-white">
              {idx + 1}. {q.question}
            </p>
            <p className={`text-xs ${right ? "text-green-400" : "text-red-400"}`}>
              Your answer: {describeAnswer(q, answers[q.id])}
            </p>
            {showCorrect && !right && (
              <p className="mt-1 text-xs text-green-400">
                Correct answer: {describeCorrect(q)}
              </p>
            )}
            {showCorrect && q.explanation && (
              <p className="mt-1 text-xs text-white/60">{q.explanation}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuizReviewList;