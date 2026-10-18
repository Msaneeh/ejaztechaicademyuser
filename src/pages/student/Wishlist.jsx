import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Search,
  Star,
  Clock,
  PlayCircle,
  Trash2,
} from "lucide-react";
import { courses } from "@/mockData/courses"; // Import global data

export default function Wishlist() {
  const [savedCourses, setSavedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load saved courses from localStorage on mount
  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem("ejaztech_wishlist") || "[]");
    // Filter the full courses list by the saved IDs
    const mySavedCourses = courses.filter((c) => savedIds.includes(c.id));
    setSavedCourses(mySavedCourses);
  }, []);

  // Remove item from local state AND localStorage
  const handleRemove = (id) => {
    const updatedCourses = savedCourses.filter((c) => c.id !== id);
    setSavedCourses(updatedCourses);
    
    // Update localStorage so the heart icon on the Explore page turns empty
    const updatedIds = updatedCourses.map((c) => c.id);
    localStorage.setItem("ejaztech_wishlist", JSON.stringify(updatedIds));
  };

  const filteredCourses = savedCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.mentor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* ---------------- Header ---------------- */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Wishlist
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {savedCourses.length} {savedCourses.length === 1 ? "course" : "courses"} saved for later.
          </p>
        </div>
      </section>

      {/* ---------------- Search ---------------- */}
      {savedCourses.length > 0 && (
        <section>
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="search"
              placeholder="Search your wishlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                h-10 w-full rounded-full
                border border-ink-line bg-surface
                pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint
                outline-none transition
                focus:border-ink/30 focus:ring-2 focus:ring-ink/5
              "
            />
          </div>
        </section>
      )}

      {/* ---------------- Course List ---------------- */}
      <section>
        {savedCourses.length === 0 ? (
          /* Empty State (No items saved) */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-line py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ink/5">
              <Heart className="h-8 w-8 text-ink-faint" />
            </div>
            <h3 className="text-lg font-semibold text-ink">Your wishlist is empty</h3>
            <p className="mt-2 max-w-sm text-sm text-ink-soft">
              Save courses you're interested in, and they'll appear here for easy access.
            </p>
            <Link
              to="/explore"
              className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-canvas transition hover:opacity-90"
            >
              Explore Courses
            </Link>
          </div>
        ) : filteredCourses.length === 0 ? (
          /* Empty State (Search yields no results) */
          <div className="py-12 text-center text-ink-soft">
            No courses match your search.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <WishlistCard
                key={course.id}
                course={course}
                onRemove={() => handleRemove(course.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Row Card Component                                                  */
/* ------------------------------------------------------------------ */
function WishlistCard({ course, onRemove }) {
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