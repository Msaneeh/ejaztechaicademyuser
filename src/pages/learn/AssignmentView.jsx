// src/pages/learn/AssignmentView.jsx
import { useState } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";

const DEFAULT_REQUIREMENTS = [
  "Create a component with at least two props.",
  "Use the component more than once with different values.",
  "Include a short explanation of how the component works.",
  "Push your project to a public GitHub repository and submit the link.",
];

const GITHUB_URL = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+(\/.*)?$/i;

const AssignmentView = ({
  assignment,
  moduleTitle,
  submission,
  draft,
  onDraftChange,
  onSubmit,
  onEditSubmission,
  onBackToLesson,
}) => {
  const [showErrors, setShowErrors] = useState(false);

  const requirements = assignment.requirements || DEFAULT_REQUIREMENTS;
  const isEditing = Boolean(submission && draft);
  
  // Validation
  const errors = {
    projectName: draft?.projectName?.trim() ? "" : "Enter a project name.",
    githubUrl: GITHUB_URL.test(draft?.githubUrl?.trim()) ? "" : "Enter a GitHub repository link, like https://github.com/username/project.",
    description: draft?.description?.trim().length >= 20 ? "" : "Write at least a sentence or two about your project.",
  };

  const handleSubmitClick = () => {
    if (Object.values(errors).some(Boolean)) {
      setShowErrors(true);
      return;
    }
    onSubmit(assignment, draft);
    setShowErrors(false);
  };

  const inputClass = (err) =>
    `w-full rounded-lg border bg-black/50 p-3 text-sm text-white outline-none focus:border-blue-500 ${
      showErrors && err ? "border-red-500" : "border-white/20"
    }`;

  return (
    <div className="mx-auto w-full max-w-4xl p-6 lg:p-12">
      <button onClick={onBackToLesson} className="mb-6 flex items-center gap-2 text-sm text-white/50 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to lesson
      </button>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{moduleTitle}</p>
          <h1 className="mt-2 text-3xl font-bold text-white">{assignment.title}</h1>
        </div>
        <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">{assignment.points ?? 100} points</span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
            <h3 className="mb-2 text-sm font-semibold text-white">Instructions</h3>
            <p className="text-sm leading-relaxed text-white/80">{assignment.instructions}</p>

            <h3 className="mb-2 mt-6 text-sm font-semibold text-white">Requirements</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-white/70">
              {requirements.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Your submission</h3>

            {!submission || isEditing ? (
              <div className="space-y-5">
                <div>
                  <label htmlFor="projectName" className="mb-2 block text-xs font-medium text-white/70">Project name</label>
                  <input
                    id="projectName"
                    type="text"
                    value={draft?.projectName || ""}
                    onChange={(e) => onDraftChange(assignment, { ...draft, projectName: e.target.value })}
                    placeholder="e.g. Reusable Profile Card"
                    className={inputClass(errors.projectName)}
                  />
                  {showErrors && errors.projectName && <p className="mt-1 text-xs text-red-400">{errors.projectName}</p>}
                </div>

                <div>
                  <label htmlFor="githubUrl" className="mb-2 block text-xs font-medium text-white/70">GitHub repository link</label>
                  <input
                    id="githubUrl"
                    type="url"
                    value={draft?.githubUrl || ""}
                    onChange={(e) => onDraftChange(assignment, { ...draft, githubUrl: e.target.value })}
                    placeholder="https://github.com/username/project"
                    className={inputClass(errors.githubUrl)}
                  />
                  {showErrors && errors.githubUrl && <p className="mt-1 text-xs text-red-400">{errors.githubUrl}</p>}
                  <p className="mt-1 text-xs text-white/40">Make sure the repository is public so your instructor can open it.</p>
                </div>

                <div>
                  <label htmlFor="description" className="mb-2 block text-xs font-medium text-white/70">Description</label>
                  <textarea
                    id="description"
                    rows="5"
                    value={draft?.description || ""}
                    onChange={(e) => onDraftChange(assignment, { ...draft, description: e.target.value })}
                    placeholder="What does your project do, and how does your component work?"
                    className={inputClass(errors.description)}
                  />
                  {showErrors && errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
                </div>

                <div className="flex justify-end gap-3">
                  {isEditing && (
                    <button onClick={() => onEditSubmission(assignment, null)} className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 hover:text-white">Cancel</button>
                  )}
                  <button onClick={handleSubmitClick} className="rounded-lg bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-gray-200">
                    {isEditing ? "Save changes" : "Submit Assignment"}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs text-white/50">Submitted {submission.submittedAt.toLocaleString()}</p>
                <h4 className="mt-3 text-lg font-semibold text-white">{submission.projectName}</h4>
                <a href={submission.githubUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1.5 break-all text-sm text-blue-400 hover:text-blue-300">
                  {submission.githubUrl} <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                </a>
                <p className="mt-4 whitespace-pre-wrap rounded-lg bg-black/40 p-3 text-sm text-white/80">{submission.description}</p>
                {assignment.allowResubmit !== false && (
                  <div className="mt-6 flex justify-end">
                    <button onClick={() => onEditSubmission(assignment, submission)} className="rounded-lg border border-white/20 px-5 py-2 text-sm font-medium text-white hover:bg-white/5">Edit submission</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">Submission status</h3>
            <p className={`text-sm font-medium ${submission ? "text-green-400" : "text-yellow-500"}`}>{submission ? "Submitted" : "Not submitted"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">Due date</h3>
            <p className="text-sm font-medium text-white">{assignment.dueDate || "Set by instructor"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">Grade</h3>
            <p className="text-sm font-medium text-white/70">{submission ? "Awaiting review" : "Available after submission"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AssignmentView;