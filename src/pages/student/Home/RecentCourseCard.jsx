import { Link } from "react-router-dom";
import { PlayCircle, ArrowRight } from "lucide-react";

export default function RecentCourseCard({ course }) {
  return (
    <Link
      to={`/learn/${course.id}`}
      className="
        group flex flex-col rounded-2xl border border-ink-line bg-surface p-5
        transition hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-sm
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold tracking-tight text-ink">
            {course.title}
          </h3>
          <p className="mt-1 text-xs text-ink-faint">
            {course.mentor} · {course.lessons}
          </p>
        </div>
        <span className="shrink-0 text-sm font-medium text-ink">
          {course.progress}%
        </span>
      </div>

      <div className="mt-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/5">
          <div
            className="h-full rounded-full bg-ink"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-ink-line pt-4 text-xs">
        <span className="inline-flex items-center gap-1.5 text-ink-soft">
          <PlayCircle className="h-3.5 w-3.5" />
          Continue course
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
      </div>
    </Link>
  );
}