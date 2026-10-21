// src/pages/learn/QuizView.jsx
import { ArrowLeft, CheckCircle2, X, Clock, Lightbulb } from "lucide-react";
import {
  parseMinutes,
  formatClock,
  questionType,
  optionsFor,
  isAnswered,
  isCorrect,
  describeAnswer,
  describeCorrect,
  quizKey,
} from "./utils";

const QuizView = ({
  quiz,
  moduleTitle,
  activeActivity,
  quizMeta,
  quizAnswers,
  quizAttempts,
  shownHints,
  confirmOpen,
  reviewOpen,
  now,
  onBackToLesson,
  onStartQuiz,
  onAnswerSelect,
  onGoToQuestion,
  onHintToggle,
  onSubmitQuiz,
  onConfirmSubmit,
  onCancelSubmit,
  onToggleReview,
  onRetryQuiz,
}) => {
  const meta = quizMeta[quizKey(quiz)] || { phase: "intro", index: 0, endsAt: null };
  const answers = quizAnswers[quizKey(quiz)] || {};
  const attempts = quizAttempts[quizKey(quiz)] || [];
  const passMark = quiz.passMark ?? 50;
  const maxAttempts = quiz.maxAttempts ?? null;
  const minutes = parseMinutes(quiz.timeLimit);

  // --- Intro ---
  if (meta.phase === "intro") {
    const attemptsLeft = maxAttempts ? maxAttempts - attempts.length : null;
    const canResume = Boolean(meta.resumable) && Object.keys(answers).length > 0;
    const outOfAttempts = attemptsLeft !== null && attemptsLeft <= 0;

    return (
      <div className="mx-auto w-full max-w-3xl p-6 lg:p-12">
        <button onClick={onBackToLesson} className="mb-6 flex items-center gap-2 text-sm text-white/50 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to lesson
        </button>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{moduleTitle}</p>
        <h1 className="mt-2 text-3xl font-bold text-white">{quiz.title}</h1>
        <p className="mt-2 text-base text-white/70">{quiz.description}</p>

        <div className="mt-8 grid grid-cols-2 gap-6 border-y border-white/10 py-4 sm:grid-cols-4">
          <div>
            <p className="text-xs uppercase text-white/50">Questions</p>
            <p className="text-lg font-semibold text-white">{quiz.questions.length}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-white/50">Time limit</p>
            <p className="text-lg font-semibold text-white">{minutes ? `${minutes} min` : "None"}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-white/50">Pass mark</p>
            <p className="text-lg font-semibold text-white">{passMark}%</p>
          </div>
          <div>
            <p className="text-xs uppercase text-white/50">Attempts</p>
            <p className="text-lg font-semibold text-white">{maxAttempts ? `${attempts.length} of ${maxAttempts} used` : "Unlimited"}</p>
          </div>
        </div>

        <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-white/70">
          <li>{quiz.allowNavigation === false ? "You can't go back to earlier questions." : "You can change your answers and move between questions before you submit."}</li>
          <li>Your answers are saved as you go, so leaving this page won't erase them.</li>
          {minutes && <li>The quiz is submitted automatically when the timer reaches zero.</li>}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {canResume ? (
            <>
              <button onClick={() => onStartQuiz(quiz, { fresh: false })} className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700">Resume quiz</button>
              {!outOfAttempts && <button onClick={() => onStartQuiz(quiz, { fresh: true })} className="rounded-lg px-4 py-3 text-sm font-medium text-white/70 hover:text-white">Start over</button>}
            </>
          ) : (
            <button disabled={outOfAttempts} onClick={() => onStartQuiz(quiz, { fresh: true })} className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-40">Start Quiz</button>
          )}
          {attempts.length > 0 && <button onClick={() => onStartQuiz(quiz, { fresh: false, viewResults: true })} className="rounded-lg px-4 py-3 text-sm font-medium text-white/70 hover:text-white">View last result</button>}
        </div>
        {outOfAttempts && <p className="mt-3 text-sm text-yellow-500">You've used all of your attempts.</p>}
      </div>
    );
  }

  // --- Taking ---
  if (meta.phase === "taking") {
    const total = quiz.questions.length;
    const index = Math.min(meta.index || 0, total - 1);
    const question = quiz.questions[index];
    const type = questionType(question);
    const answeredCount = quiz.questions.filter((q) => isAnswered(q, answers[q.id])).length;
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
            <div className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium tabular-nums ${remaining < 60000 ? "bg-red-500/10 text-red-500" : "bg-white/10 text-white"}`}>
              <Clock className="h-4 w-4" /> {formatClock(remaining)}
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs text-white/50">
            <span>Question {index + 1} of {total}</span>
            <span>{answeredCount} of {total} answered</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${(answeredCount / total) * 100}%` }} />
          </div>
          {canGoBack && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {quiz.questions.map((q, i) => (
                <button key={q.id} onClick={() => onGoToQuestion(i)} className={`h-7 w-7 rounded-md text-xs font-medium transition ${i === index ? "bg-blue-600 text-white" : isAnswered(q, answers[q.id]) ? "bg-white/20 text-white" : "border border-white/15 text-white/50 hover:bg-white/5"}`}>{i + 1}</button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 lg:p-8">
          <h2 className="mb-1 text-lg font-medium text-white">{question.question}</h2>
          <p className="mb-6 text-xs text-white/50">{type === "multiple" ? "Select all that apply." : "Select one answer."}</p>
          <div className="space-y-3">
            {optionsFor(question).map((opt, idx) => {
              const value = answers[question.id];
              const selected = type === "multiple" ? Array.isArray(value) && value.includes(idx) : value === idx;
              return (
                <label key={idx} className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${selected ? "border-blue-500 bg-blue-500/10" : "border-white/10 hover:bg-white/5"}`}>
                  <input type={type === "multiple" ? "checkbox" : "radio"} name={`q_${question.id}`} checked={selected} onChange={() => onAnswerSelect(quiz, question, idx)} className="h-4 w-4 border-white/30 bg-transparent text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-white">{opt}</span>
                </label>
              );
            })}
          </div>
          {question.hint && (
            <div className="mt-6">
              {shownHints[question.id] ? (
                <p className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-200">{question.hint}</p>
              ) : (
                <button onClick={() => onHintToggle(question.id)} className="flex items-center gap-2 text-xs font-medium text-yellow-400 hover:text-yellow-300">
                  <Lightbulb className="h-4 w-4" /> Need a hint?
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button onClick={() => onGoToQuestion(Math.max(0, index - 1))} disabled={index === 0 || !canGoBack} className="rounded-lg px-6 py-2 text-sm font-medium text-white/70 hover:text-white disabled:opacity-30">Previous</button>
          {index < total - 1 ? (
            <button onClick={() => onGoToQuestion(index + 1)} className="rounded-lg bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-gray-200">Next Question</button>
          ) : (
            <button onClick={() => onConfirmSubmit(true)} className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700">Submit Quiz</button>
          )}
        </div>

        {/* Confirmation Dialog */}
        {confirmOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
              <h3 className="text-lg font-semibold text-white">Submit your quiz?</h3>
              <p className="mt-2 text-sm text-white/70">
                {unanswered > 0 ? `You haven't answered ${unanswered} ${unanswered === 1 ? "question" : "questions"}. Unanswered questions score zero.` : "You've answered every question."} You can't change your answers after you submit.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => onConfirmSubmit(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 hover:text-white">Keep working</button>
                <button onClick={onSubmitQuiz} className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">Submit quiz</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- Results ---
  if (meta.phase === "results") {
    const last = attempts[attempts.length - 1];
    if (!last) return <div className="p-10 text-white">No results found.</div>;

    const canRetry = maxAttempts === null || attempts.length < maxAttempts;
    const canReview = quiz.allowReview !== false;
    const showCorrect = quiz.showCorrectAnswers !== false;

    return (
      <div className="mx-auto w-full max-w-2xl p-6 text-center lg:p-12">
        <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${last.passed ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
          {last.passed ? <CheckCircle2 className="h-10 w-10" /> : <X className="h-10 w-10" />}
        </div>
        <h1 className="text-3xl font-bold text-white">{last.passed ? "You passed" : "Not passed yet"}</h1>
        <p className="mt-2 text-white/70">You scored {last.score} out of {last.total} ({last.percent}%). The pass mark is {passMark}%.</p>
        <p className="mt-1 text-xs text-white/50">Attempt {attempts.length}{maxAttempts ? ` of ${maxAttempts}` : ""}</p>

        <button onClick={onBackToLesson} className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700">
          <ArrowLeft className="h-4 w-4" /> Back to lessons
        </button>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {canReview && <button onClick={onToggleReview} className="rounded-lg border border-white/20 px-5 py-2 text-sm font-medium text-white hover:bg-white/5">{reviewOpen ? "Hide answers" : "Review Answers"}</button>}
          {canRetry && <button onClick={() => onRetryQuiz(quiz)} className="rounded-lg bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-gray-200">Retry Quiz</button>}
        </div>

        {canReview && reviewOpen && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 text-left">
            <h3 className="mb-4 text-sm font-semibold text-white">Your answers</h3>
            {quiz.questions.map((q, idx) => {
              const right = isCorrect(q, last.answers[q.id]);
              return (
                <div key={q.id} className="mb-5 last:mb-0">
                  <p className="mb-2 text-sm text-white">{idx + 1}. {q.question}</p>
                  <p className={`text-xs ${right ? "text-green-400" : "text-red-400"}`}>Your answer: {describeAnswer(q, last.answers[q.id])}</p>
                  {showCorrect && !right && <p className="mt-1 text-xs text-green-400">Correct answer: {describeCorrect(q)}</p>}
                  {showCorrect && q.explanation && <p className="mt-1 text-xs text-white/60">{q.explanation}</p>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return null;
}


export default QuizView;