import { 
  Star,
  Clock,
  PlayCircle,
  Trash2,} from "lucide-react"

const WishlistCard = ({ course, onRemove }) => {
  return (
    <div
      className="
        group relative flex flex-col gap-5 rounded-2xl
        border border-ink-line bg-surface p-5
        transition hover:border-ink/20 sm:flex-row sm:items-center
      "
    >
      {/* Thumbnail */}
      <Link
        to={`/courses/${course.id}`}
        className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-ink/5 sm:w-56"
      >
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PlayCircle className="h-8 w-8 text-ink-faint/30" />
          </div>
        )}
      </Link>

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
              by {course.mentor}
            </p>
          </div>
          
          {/* Remove Button (Icon) */}
          <button
            onClick={onRemove}
            className="
              inline-flex h-8 w-8 items-center justify-center rounded-full
              text-ink-faint transition hover:bg-red-50 hover:text-red-600
            "
            title="Remove from wishlist"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-sm text-ink-soft line-clamp-2">
          {course.description}
        </p>

        {/* Meta Row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-faint">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-current" /> {course.rating}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {course.duration}
          </span>
          <span className="rounded-full border border-ink-line px-2 py-0.5 uppercase tracking-wider text-[10px]">
            {course.difficulty}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-2 flex shrink-0 items-center justify-between sm:mt-0 sm:ml-6 sm:flex-col sm:items-end sm:justify-center sm:gap-3">
        <span className="text-base font-semibold text-ink">
          {typeof course.price === "number" 
            ? `₦${course.price.toLocaleString()}` 
            : course.price}
        </span>
        <Link
          to={`/courses/${course.id}`}
          className="
            rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-canvas
            transition hover:opacity-90
          "
        >
          View Course
        </Link>
      </div>
    </div>
  );
}

export default WishlistCard;