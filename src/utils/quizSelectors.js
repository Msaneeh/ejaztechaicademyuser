import { parseMinutes, quizKey } from "./utils";

export function getQuizState(quiz, { quizMeta, quizAnswers, quizAttempts }) {
  const key = quizKey(quiz);
  const meta = quizMeta[key] || { phase: "intro", index: 0, endsAt: null };
  const answers = quizAnswers[key] || {};
  const attempts = quizAttempts[key] || [];

  return {
    meta,
    answers,
    attempts,
    passMark: quiz.passMark ?? 50,
    maxAttempts: quiz.maxAttempts ?? null,
    minutes: parseMinutes(quiz.timeLimit),
  };
}