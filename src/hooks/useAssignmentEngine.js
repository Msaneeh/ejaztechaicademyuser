import { useState } from "react";
import { quizKey } from "../utils/utils";

export function useAssignmentEngine() {
  const [drafts, setDrafts] = useState({});
  const [submissions, setSubmissions] = useState({});

  const updateDraft = (assignment, draft) => {
    setDrafts((prev) => ({ ...prev, [quizKey(assignment)]: draft }));
  };

  const submit = (assignment, draft) => {
    setSubmissions((prev) => ({
      ...prev,
      [quizKey(assignment)]: { ...draft, submittedAt: new Date() },
    }));
    setDrafts((prev) => ({ ...prev, [quizKey(assignment)]: null }));
  };

  const editSubmission = (assignment, submission) => {
    setDrafts((prev) => ({
      ...prev,
      [quizKey(assignment)]: submission,
    }));
  };

  const getStatus = (assignment) =>
    submissions[quizKey(assignment)]
      ? "Assignment · Submitted"
      : "Assignment · Not submitted";

  return {
    drafts,
    submissions,
    updateDraft,
    submit,
    editSubmission,
    getStatus,
  };
}