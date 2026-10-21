import { PlayCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const MyLearningCard = ({ course }) => {
  const isCompleted = course.status === "completed";
  const isNotStarted = course.status === "not-started";

  return (
    <div
      className="
        group relative flex flex-col gap-5 rounded-2xl
        border border-ink-line bg-surface p-5
        transition hover:border-ink/20 sm:flex-row sm:items-center
      "
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-ink/5 sm:w-48">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PlayCircle className="h-8 w-8 text-ink-faint/30" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              to={`/courses/${course.id}`}
              className="text-lg font-semibold tracking-tight text-ink hover:underline"
            >
              {course.title}
            </Link>
            <p className="mt-1 text-xs text-ink-faint">
              {course.mentor} · {course.lessonText}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 max-w-md">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-ink-soft">
              {isCompleted ? "Completed" : isNotStarted ? "Not started" : `${course.progress}% complete`}
            </span>
            <span className="text-ink-faint">{course.lastAccessed}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/5">
            <div
              className="h-full rounded-full bg-ink transition-all"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-2 shrink-0 sm:mt-0 sm:ml-6">
        <Link
          to={`/learn/${course.id}`}
          className={[
            "flex w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition sm:w-auto",
            isCompleted
              ? "border border-ink-line bg-surface text-ink hover:bg-ink/5"
              : "bg-ink text-canvas hover:opacity-90",
          ].join(" ")}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Review
            </>
          ) : isNotStarted ? (
            <>
              <PlayCircle className="h-4 w-4" />
              Start
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4" />
              Resume
            </>
          )}
        </Link>
      </div>
    </div>
  );
}

export default MyLearningCard;