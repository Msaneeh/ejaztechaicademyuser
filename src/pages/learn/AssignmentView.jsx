import { ArrowLeft } from "lucide-react";
import AssignmentInstructions from "@/components/Learn/assignment/AssignmentInstructions";
import SubmissionForm from "@/components/Learn/assignment/SubmissionForm";
import SubmissionSummary from "@/components/Learn/assignment/SubmissionSummary";
import AssignmentSidebar from "@/components/Learn/assignment/AssignmentSidebar";

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
  const isEditing = Boolean(submission && draft);

  return (
    <div className="mx-auto w-full max-w-4xl p-6 lg:p-12">
      <button
        onClick={onBackToLesson}
        className="mb-6 flex items-center gap-2 text-sm text-white/50 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Back to lesson
      </button>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
            {moduleTitle}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            {assignment.title}
          </h1>
        </div>
        <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
          {assignment.points ?? 100} points
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <AssignmentInstructions assignment={assignment} />

          <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Your submission
            </h3>

            {!submission || isEditing ? (
              <SubmissionForm
                assignment={assignment}
                draft={draft}
                isEditing={isEditing}
                onDraftChange={onDraftChange}
                onSubmit={onSubmit}
                onCancelEdit={() => onEditSubmission(assignment, null)}
              />
            ) : (
              <SubmissionSummary
                assignment={assignment}
                submission={submission}
                onEdit={() => onEditSubmission(assignment, submission)}
              />
            )}
          </div>
        </div>

        <AssignmentSidebar assignment={assignment} submission={submission} />
      </div>
    </div>
  );
};

export default AssignmentView;