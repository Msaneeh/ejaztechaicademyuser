import { ArrowLeft } from "lucide-react";

const Stat = ({ label, value }) => (
  <div>
    <p className="text-xs uppercase text-white/50">{label}</p>
    <p className="text-lg font-semibold text-white">{value}</p>
  </div>
);

const QuizIntro = ({ quiz, moduleTitle, meta, answers, attempts, passMark, maxAttempts, minutes, onBackToLesson, onStartQuiz }) => {
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
        <Stat label="Questions" value={quiz.questions.length} />
        <Stat label="Time limit" value={minutes ? `${minutes} min` : "None"} />
        <Stat label="Pass mark" value={`${passMark}%`} />
        <Stat label="Attempts" value={maxAttempts ? `${attempts.length} of ${maxAttempts} used` : "Unlimited"} />
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
};

export default QuizIntro;