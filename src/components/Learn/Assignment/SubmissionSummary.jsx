import { ExternalLink } from "lucide-react";

const SubmissionSummary = ({ assignment, submission, onEdit }) => {
  return (
    <div>
      <p className="text-xs text-white/50">
        Submitted {submission.submittedAt.toLocaleString()}
      </p>
      <h4 className="mt-3 text-lg font-semibold text-white">
        {submission.projectName}
      </h4>
      <a
        href={submission.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center gap-1.5 break-all text-sm text-blue-400 hover:text-blue-300"
      >
        {submission.githubUrl}{" "}
        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
      </a>
      <p className="mt-4 whitespace-pre-wrap rounded-lg bg-black/40 p-3 text-sm text-white/80">
        {submission.description}
      </p>
      {assignment.allowResubmit !== false && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={onEdit}
            className="rounded-lg border border-white/20 px-5 py-2 text-sm font-medium text-white hover:bg-white/5"
          >
            Edit submission
          </button>
        </div>
      )}
    </div>
  );
};

export default SubmissionSummary;