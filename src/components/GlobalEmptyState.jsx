import { Link } from "react-router-dom"
import { BookOpen } from "lucide-react";

const GlobalEmptyState = () => {
  return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-line py-24 text-center">
          <BookOpen className="mb-4 h-12 w-12 text-ink-faint/50" />
          <h3 className="text-lg font-semibold text-ink">No courses yet</h3>
          <p className="mt-1 max-w-sm text-sm text-ink-soft">
            You haven't enrolled in any courses. Explore our catalog to start learning today.
          </p>
          <Link
            to="/explore"
            className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-canvas transition hover:opacity-90"
          >
            Explore Courses
          </Link>
        </div>
  )
}

export default GlobalEmptyState