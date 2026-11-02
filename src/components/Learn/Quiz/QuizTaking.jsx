import { Clock, Lightbulb } from "lucide-react";
import {
  formatClock,
  questionType,
  optionsFor,
  isAnswered,
} from "../../../utils/utils";
import QuizConfirmDialog from "./QuizConfirmDialog";

const QuestionNav = ({ questions, answers, currentIndex, onGoTo }) => (
  <div className="mt-3 flex flex-wrap gap-1.5">
    {questions.map((q, i) => (
      <button
        key={q.id}
        onClick={() => onGoTo(i)}
        className={`h-7 w-7 rounded-md text-xs font-medium transition ${
          i === currentIndex
            ? "bg-blue-600 text-white"
            : isAnswered(q, answers[q.id])
            ? "bg-white/20 text-white"
            : "border border-white/15 text-white/50 hover:bg-white/5"
        }`}
      >
        {i + 1}
      </button>
    ))}
  </div>
);

const QuizTaking = ({
  quiz,
  moduleTitle,
  meta,
  answers,
  shownHints,
  confirmOpen,
  now,
  onGoToQuestion,
  onAnswerSelect,
  onHintToggle,
  onSubmitQuiz,
  onConfirmSubmit,
}) => {
  const total = quiz.questions.length;
  const index = Math.min(meta.index || 0, total - 1);
  const question = quiz.questions[index];
  const type = questionType(question);
  const answeredCount = quiz.questions.filter((q) =>
    isAnswered(q, answers[q.id])
  ).length;
  const unanswered = total - answeredCount;
  const canGoBack = quiz.allowNavigation !== false;
  const remaining = meta.endsAt ? meta.endsAt - now : null;

  return (
    <div className="mx-auto w-full max-w-3xl p-6 lg:p-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">{quiz.title}</h1>
          <p className="text-xs text-white/50">{moduleTitle}</p>
        </div>
        {remaining !== null && (
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium tabular-nums ${
              remaining < 60000
                ? "bg-red-500/10 text-red-500"
                : "bg-white/10 text-white"
            }`}
          >
            <Clock className="h-4 w-4" /> {formatClock(remaining)}
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-white/50">
          <span>
            Question {index + 1} of {total}
          </span>
          <span>
            {answeredCount} of {total} answered
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-blue-500 transition-all"
            style={{ width: `${(answeredCount / total) * 100}%` }}
          />
        </div>
        {canGoBack && (
          <QuestionNav
            questions={quiz.questions}
            answers={answers}
            currentIndex={index}
            onGoTo={onGoToQuestion}
          />
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 lg:p-8">
        <h2 className="mb-1 text-lg font-medium text-white">{question.question}</h2>
        <p className="mb-6 text-xs text-white/50">
          {type === "multiple" ? "Select all that apply." : "Select one answer."}
        </p>
        <div className="space-y-3">
          {optionsFor(question).map((opt, idx) => {
            const value = answers[question.id];
            const selected =
              type === "multiple"
                ? Array.isArray(value) && value.includes(idx)
                : value === idx;
            return (
              <label
                key={idx}
                className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                  selected
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                <input
                  type={type === "multiple" ? "checkbox" : "radio"}
                  name={`q_${question.id}`}
                  checked={selected}
                  onChange={() => onAnswerSelect(quiz, question, idx)}
                  className="h-4 w-4 border-white/30 bg-transparent text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-white">{opt}</span>
              </label>
            );
          })}
        </div>

        {question.hint && (
          <div className="mt-6">
            {shownHints[question.id] ? (
              <p className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-200">
                {question.hint}
              </p>
            ) : (
              <button
                onClick={() => onHintToggle(question.id)}
                className="flex items-center gap-2 text-xs font-medium text-yellow-400 hover:text-yellow-300"
              >
                <Lightbulb className="h-4 w-4" /> Need a hint?
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => onGoToQuestion(Math.max(0, index - 1))}
          disabled={index === 0 || !canGoBack}
          className="rounded-lg px-6 py-2 text-sm font-medium text-white/70 hover:text-white disabled:opacity-30"
        >
          Previous
        </button>
        {index < total - 1 ? (
          <button
            onClick={() => onGoToQuestion(index + 1)}
            className="rounded-lg bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-gray-200"
          >
            Next Question
          </button>
        ) : (
          <button
            onClick={() => onConfirmSubmit(true)}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Submit Quiz
          </button>
        )}
      </div>

      {confirmOpen && (
        <QuizConfirmDialog
          unanswered={unanswered}
          onKeepWorking={() => onConfirmSubmit(false)}
          onSubmit={onSubmitQuiz}
        />
      )}
    </div>
  );
};

export default QuizTaking;