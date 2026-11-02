import { useState } from "react";
import { validateSubmission, hasErrors } from "@/utils/assignmentValidation";

const inputClass = (showErrors, err) =>
  `w-full rounded-lg border bg-black/50 p-3 text-sm text-white outline-none focus:border-blue-500 ${
    showErrors && err ? "border-red-500" : "border-white/20"
  }`;

const SubmissionForm = ({
  assignment,
  draft,
  isEditing,
  onDraftChange,
  onSubmit,
  onCancelEdit,
}) => {
  const [showErrors, setShowErrors] = useState(false);
  const errors = validateSubmission(draft);

  const handleSubmitClick = () => {
    if (hasErrors(errors)) {
      setShowErrors(true);
      return;
    }
    onSubmit(assignment, draft);
    setShowErrors(false);
  };

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="projectName"
          className="mb-2 block text-xs font-medium text-white/70"
        >
          Project name
        </label>
        <input
          id="projectName"
          type="text"
          value={draft?.projectName || ""}
          onChange={(e) =>
            onDraftChange(assignment, {
              ...draft,
              projectName: e.target.value,
            })
          }
          placeholder="e.g. Reusable Profile Card"
          className={inputClass(showErrors, errors.projectName)}
        />
        {showErrors && errors.projectName && (
          <p className="mt-1 text-xs text-red-400">{errors.projectName}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="githubUrl"
          className="mb-2 block text-xs font-medium text-white/70"
        >
          GitHub repository link
        </label>
        <input
          id="githubUrl"
          type="url"
          value={draft?.githubUrl || ""}
          onChange={(e) =>
            onDraftChange(assignment, {
              ...draft,
              githubUrl: e.target.value,
            })
          }
          placeholder="https://github.com/username/project"
          className={inputClass(showErrors, errors.githubUrl)}
        />
        {showErrors && errors.githubUrl && (
          <p className="mt-1 text-xs text-red-400">{errors.githubUrl}</p>
        )}
        <p className="mt-1 text-xs text-white/40">
          Make sure the repository is public so your instructor can open it.
        </p>
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-xs font-medium text-white/70"
        >
          Description
        </label>
        <textarea
          id="description"
          rows="5"
          value={draft?.description || ""}
          onChange={(e) =>
            onDraftChange(assignment, {
              ...draft,
              description: e.target.value,
            })
          }
          placeholder="What does your project do, and how does your component work?"
          className={inputClass(showErrors, errors.description)}
        />
        {showErrors && errors.description && (
          <p className="mt-1 text-xs text-red-400">{errors.description}</p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        {isEditing && (
          <button
            onClick={onCancelEdit}
            className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 hover:text-white"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmitClick}
          className="rounded-lg bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-gray-200"
        >
          {isEditing ? "Save changes" : "Submit Assignment"}
        </button>
      </div>
    </div>
  );
};

export default SubmissionForm;