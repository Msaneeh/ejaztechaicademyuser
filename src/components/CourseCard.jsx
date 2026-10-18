import { Link } from "react-router-dom";
import { Clock, Users, Star, PlayCircle } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="
        group relative flex flex-col overflow-hidden rounded-2xl
        border border-border bg-card
        transition
        hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm
      "
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-secondary">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PlayCircle className="h-10 w-10 text-muted-foreground/50" />
          </div>
        )}

        {/* Category pill */}
        <span
          className="
            absolute left-3 top-3 rounded-full
            border border-border bg-background/80 px-2.5 py-1
            text-[10px] font-medium uppercase tracking-wider text-foreground
            backdrop-blur-md
          "
        >
          {course.category}
        </span>

        {/* Difficulty pill */}
        <span
          className="
            absolute right-3 top-3 rounded-full
            border border-border bg-background/80 px-2.5 py-1
            text-[10px] font-medium text-muted-foreground
            backdrop-blur-md
          "
        >
          {course.difficulty}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {course.title}
        </h3>

        <p className="mt-1 text-xs text-muted-foreground">
          by {course.mentor}
        </p>

        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
          {course.description}
        </p>

        {/* Meta row */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {course.students.toLocaleString()}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5" />
            {course.rating}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm font-medium text-foreground">
            {course.price}
          </span>
          <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
            View course →
          </span>
        </div>
      </div>
    </Link>
  );
}