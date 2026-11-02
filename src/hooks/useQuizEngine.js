import { useState, useEffect } from "react";
import { parseMinutes, isCorrect, quizKey } from "../utils/utils";

export function useQuizEngine(activeActivity) {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizMeta, setQuizMeta] = useState({});
  const [quizAttempts, setQuizAttempts] = useState({});
  const [shownHints, setShownHints] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [now, setNow] = useState(Date.now());

  // Timer tick
  const taking =
    activeActivity?.type === "quiz" &&
    quizMeta[quizKey(activeActivity.data)]?.phase === "taking";
  const endsAt = taking ? quizMeta[quizKey(activeActivity.data)].endsAt : null;

  useEffect(() => {
    if (!endsAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  // Shared scoring routine — used by both manual submit and auto-submit on timeout
  const finalizeAttempt = (quiz, answers) => {
    const score = quiz.questions.filter((q) =>
      isCorrect(q, answers[q.id])
    ).length;
    const percent = Math.round((score / quiz.questions.length) * 100);

    setQuizAttempts((prev) => ({
      ...prev,
      [quizKey(quiz)]: [
        ...(prev[quizKey(quiz)] || []),
        {
          score,
          total: quiz.questions.length,
          percent,
          passed: percent >= (quiz.passMark ?? 50),
          answers,
        },
      ],
    }));
    setQuizMeta((prev) => ({
      ...prev,
      [quizKey(quiz)]: { ...prev[quizKey(quiz)], phase: "results" },
    }));
  };

  // Auto-submit on timeout
  useEffect(() => {
    if (!endsAt || now < endsAt || !activeActivity?.data) return;
    const quiz = activeActivity.data;
    const answers = quizAnswers[quizKey(quiz)] || {};
    finalizeAttempt(quiz, answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, endsAt]);

  const startQuiz = (quiz, { fresh, viewResults = false }) => {
    const minutes = parseMinutes(quiz.timeLimit);
    const meta = quizMeta[quizKey(quiz)] || {
      phase: "intro",
      index: 0,
      endsAt: null,
    };
    if (fresh)
      setQuizAnswers((prev) => ({ ...prev, [quizKey(quiz)]: {} }));

    setQuizMeta((prev) => ({
      ...prev,
      [quizKey(quiz)]: {
        ...meta,
        phase: viewResults ? "results" : "taking",
        index: fresh ? 0 : meta.index || 0,
        endsAt:
          minutes && !viewResults ? Date.now() + minutes * 60000 : null,
      },
    }));
    setNow(Date.now());
  };

  const submitQuiz = (quiz) => {
    const answers = quizAnswers[quizKey(quiz)] || {};
    finalizeAttempt(quiz, answers);
    setConfirmOpen(false);
  };

  const selectAnswer = (quiz, q, idx) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [quizKey(quiz)]: { ...prev[quizKey(quiz)], [q.id]: idx },
    }));
  };

  const goToQuestion = (quiz, idx) => {
    setQuizMeta((prev) => ({
      ...prev,
      [quizKey(quiz)]: { ...prev[quizKey(quiz)], index: idx },
    }));
  };

  const toggleHint = (id) => setShownHints((prev) => ({ ...prev, [id]: true }));

  const quizStatus = (quiz) => {
    const attempts = quizAttempts[quizKey(quiz)] || [];
    if (!attempts.length) return "Quiz · Not attempted";
    return `Quiz · Best score ${Math.max(
      ...attempts.map((a) => a.percent)
    )}%`;
  };

  return {
    // state
    quizAnswers,
    quizMeta,
    quizAttempts,
    shownHints,
    confirmOpen,
    reviewOpen,
    now,
    // actions
    startQuiz,
    submitQuiz,
    selectAnswer,
    goToQuestion,
    toggleHint,
    setConfirmOpen,
    setReviewOpen,
    toggleReview: () => setReviewOpen((v) => !v),
    // helpers
    quizStatus,
    finalizeAttempt,
  };
}