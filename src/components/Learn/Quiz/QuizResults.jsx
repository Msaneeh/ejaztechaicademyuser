import { ArrowLeft, CheckCircle2, X } from "lucide-react";
import QuizReviewList from "./QuizReviewList";

const QuizResults = ({ quiz, attempts, passMark, maxAttempts, reviewOpen, onBackToLesson, onToggleReview, onRetryQuiz }) => {
  const last = attempts[attempts.length - 1];
  if (!last) return <div className="p-10 text-white">No results found.</div>;

  const canRetry = maxAttempts === null || attempts.length < maxAttempts;
  const canReview = quiz.allowReview !== false;
  const showCorrect = quiz.showCorrectAnswers !== false;

  return (
    <div className="mx-auto w-full max-w-2xl p-6 text-center lg:p-12">
      <div
        className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
          last.passed
            ? "bg-green-500/20 text-green-500"
            : "bg-red-500/20 text-red-500"
        }`}
      >
        {last.passed ? (
          <CheckCircle2 className="h-10 w-10" />
        ) : (
          <X className="h-10 w-10" />
        )}
      </div>
      <h1 className="text-3xl font-bold text-white">
        {last.passed ? "You passed" : "Not passed yet"}
      </h1>
      <p className="mt-2 text-white/70">
        You scored {last.score} out of {last.total} ({last.percent}%). The pass
        mark is {passMark}%.
      </p>
      <p className="mt-1 text-xs text-white/50">
        Attempt {attempts.length}
        {maxAttempts ? ` of ${maxAttempts}` : ""}
      </p>

      <button
        onClick={onBackToLesson}
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back to lessons
      </button>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {canReview && (
          <button
            onClick={onToggleReview}
            className="rounded-lg border border-white/20 px-5 py-2 text-sm font-medium text-white hover:bg-white/5"
          >
            {reviewOpen ? "Hide answers" : "Review Answers"}
          </button>
        )}
        {canRetry && (
          <button
            onClick={() => onRetryQuiz(quiz)}
            className="rounded-lg bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-gray-200"
          >
            Retry Quiz
          </button>
        )}
      </div>

      {canReview && reviewOpen && (
        <QuizReviewList
          quiz={quiz}
          answers={last.answers}
          showCorrect={showCorrect}
        />
      )}
    </div>
  );
};

export default QuizResults;