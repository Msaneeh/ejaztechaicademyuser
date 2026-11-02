import { useState } from "react";

export function useLessonProgress() {
  const [completed, setCompleted] = useState(() => new Set());

  const markComplete = (lessonId) => {
    setCompleted((prev) => new Set(prev).add(`lesson:${lessonId}`));
  };

  const isComplete = (lessonId) => completed.has(`lesson:${lessonId}`);

  return { completed, markComplete, isComplete };
}