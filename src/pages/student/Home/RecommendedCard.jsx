import { Link } from "react-router-dom";
import { PlayCircle, Star, Clock, ArrowRight } from "lucide-react";

export default function RecommendedCard({ course }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="
        group flex flex-col overflow-hidden rounded-2xl
        border border-ink-line bg-surface
        transition hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-sm
      "
    >
      
      <div className="relative aspect-video w-full bg-ink/5">
        <div className="flex h-full w-full items-center justify-center">
          <PlayCircle className="h-10 w-10 text-ink-faint/50" />
        </div>
        <span
          className="
            absolute left-3 top-3 rounded-full border border-ink-line
            bg-surface/80 px-2.5 py-1 text-[10px] font-medium uppercase
            tracking-wider text-ink backdrop-blur-md
          "
        >
          {course.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold tracking-tight text-ink">
          {course.title}
        </h3>
        <p className="mt-1 text-xs text-ink-faint">
          by {course.mentor}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-faint">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3 w-3" /> {course.rating}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {course.duration}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-ink-line pt-3">
          <span className="text-xs font-medium text-ink-soft">
            View course
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
        </div>
      </div>
    </Link>
  );
}