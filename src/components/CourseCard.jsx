import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Users, Star, PlayCircle, Heart } from "lucide-react";

const CourseCard = ({ course }) => {
  const [isSaved, setIsSaved] = useState(false);

  // Check localStorage on mount to see if this course is saved
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ejaztech_wishlist") || "[]");
    if (saved.includes(course.id)) {
      setIsSaved(true);
    }
  }, [course.id]);

  const toggleWishlist = (e) => {
    // Prevent the click from triggering the parent <Link>
    e.preventDefault(); 
    e.stopPropagation();

    const saved = JSON.parse(localStorage.getItem("ejaztech_wishlist") || "[]");
    let newSaved;

    if (isSaved) {
      newSaved = saved.filter((id) => id !== course.id);
    } else {
      newSaved = [...saved, course.id];
    }

    localStorage.setItem("ejaztech_wishlist", JSON.stringify(newSaved));
    setIsSaved(!isSaved);
  };

  return (
    <Link
      to={`/courses/${course.slug}`}
      className="
        group relative flex flex-col overflow-hidden rounded-2xl
        border border-ink-line bg-surface
        transition
        hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-sm
      "
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-ink/5">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PlayCircle className="h-10 w-10 text-ink-faint/50" />
          </div>
        )}

        {/* Top Overlay (Category Left, Difficulty + Heart Right) */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          {/* Category pill */}
          <span
            className="
              rounded-full border border-ink-line bg-surface/80 px-2.5 py-1
              text-[10px] font-medium uppercase tracking-wider text-ink
              backdrop-blur-md
            "
          >
            {course.category}
          </span>

          {/* Right side: Difficulty + Heart grouped together */}
          <div className="flex items-center gap-2">
            <span
              className="
                rounded-full border border-ink-line bg-surface/80 px-2.5 py-1
                text-[10px] font-medium text-ink-soft
                backdrop-blur-md
              "
            >
              {course.difficulty}
            </span>
            
            <button
              onClick={toggleWishlist}
              className="
                z-10 flex h-7 w-7 items-center justify-center
                rounded-full border border-ink-line bg-surface/80 backdrop-blur-md
                transition hover:bg-surface hover:scale-110
              "
              aria-label="Save to wishlist"
            >
              <Heart
                className={`h-3.5 w-3.5 transition-colors ${
                  isSaved ? "fill-red-500 text-red-500" : "text-ink-soft"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold tracking-tight text-ink">
          {course.title}
        </h3>

        <p className="mt-1 text-xs text-ink-faint">
          by {course.mentor}
        </p>

        <p className="mt-3 line-clamp-2 text-sm text-ink-soft">
          {course.description}
        </p>

        {/* Meta row */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-soft">
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
        <div className="mt-5 flex items-center justify-between border-t border-ink-line pt-4">
          <span className="text-sm font-medium text-ink">
            {typeof course.price === "number" 
              ? `₦${course.price.toLocaleString()}` 
              : course.price}
          </span>
          <span className="text-xs font-medium text-ink-soft transition-colors group-hover:text-ink">
            View course →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;