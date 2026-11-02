

export const parseMinutes = (v) => {
  if (v == null) return null;
  const n = typeof v === "number" ? v : parseInt(String(v), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
};

export const formatClock = (ms) => {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
};

export const questionType = (q) =>
  q.type || (Array.isArray(q.correctAnswer) ? "multiple" : q.options ? "single" : "truefalse");

export const optionsFor = (q) => q.options || ["True", "False"];

export const isAnswered = (q, a) =>
  questionType(q) === "multiple" ? Array.isArray(a) && a.length > 0 : a !== undefined && a !== null;

export const isCorrect = (q, a) => {
  if (!isAnswered(q, a)) return false;
  if (questionType(q) === "multiple") {
    const given = [...a].sort();
    const right = [...(q.correctAnswer || [])].sort();
    return given.length === right.length && given.every((v, i) => v === right[i]);
  }
  return a === q.correctAnswer;
};

export const describeAnswer = (q, a) => {
  if (!isAnswered(q, a)) return "Not answered";
  const opts = optionsFor(q);
  return questionType(q) === "multiple" ? a.map((i) => opts[i]).join(", ") : opts[a];
};

export const describeCorrect = (q) => {
  const opts = optionsFor(q);
  return Array.isArray(q.correctAnswer)
    ? q.correctAnswer.map((i) => opts[i]).join(", ")
    : opts[q.correctAnswer];
};

export const quizKey = (quiz) => quiz.id || quiz.title;