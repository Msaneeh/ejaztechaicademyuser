import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Clock, PlayCircle } from "lucide-react";
import { courses } from "@/mockData/courses";
import SearchBar from "@/components/SearchBar";
import ExploreFilters from "@/components/ExploreFilters";

const CATEGORIES = ["All", "Frontend", "Backend", "AI", "Data", "Design"];
const DIFFICULTIES = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All Levels");

  // Filter logic
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.mentor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      activeCategory === "All" || course.category === activeCategory;
    
    const matchesDifficulty =
      activeDifficulty === "All Levels" || course.difficulty === activeDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const searchHandler = (event) => {
    setSearchQuery(event.target.value)
  }
  

  return (
    <div className="space-y-8 pb-12">
      {/* ---------------- Page Header ---------------- */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Explore Courses
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Discover something new to learn.
          </p>
        </div>
      </section>

      {/* ---------------- Search & Filters ---------------- */}
      <section className="space-y-5">
        {/* Search Bar */}
        <SearchBar search={searchHandler} val={searchQuery} />

        {/* Category Pills */}
        <ExploreFilters 
        categ={CATEGORIES} 
        activeCat={() => setActiveCategory(cat)}
        activeDif={activeDifficulty}
        setActiDif={(e) => setActiveDifficulty(e.target.value)}
        diffu={DIFFICULTIES} />
      </section>

      {/* ---------------- Results Grid ---------------- */}
      <section>
        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-line py-24 text-center">
            <Search className="h-10 w-10 text-ink-faint/50 mb-4" />
            <h3 className="text-base font-semibold text-ink">No courses found</h3>
            <p className="mt-1 text-sm text-ink-soft">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
                setActiveDifficulty("All Levels");
              }}
              className="mt-4 text-sm font-medium text-ink underline hover:opacity-70"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course) => (
              <ExploreCourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>


    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Course Card Component                                               */
/* ------------------------------------------------------------------ */
function ExploreCourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="
        group flex flex-col overflow-hidden rounded-2xl
        border border-ink-line bg-surface
        transition hover:-translate-y-1 hover:border-ink/20 hover:shadow-md
      "
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-video w-full bg-ink/5">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PlayCircle className="h-10 w-10 text-ink-faint/30" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          <span className="rounded-full border border-ink-line bg-surface/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-ink backdrop-blur-md">
            {course.category}
          </span>
          <span className="rounded-full border border-ink-line bg-surface/90 px-2.5 py-1 text-[10px] font-medium text-ink-soft backdrop-blur-md">
            {course.difficulty}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold tracking-tight text-ink line-clamp-2">
          {course.title}
        </h3>
        <p className="mt-1 text-xs text-ink-faint">
          by {course.mentor}
        </p>

        <p className="mt-3 text-xs text-ink-soft line-clamp-2">
          {course.description}
        </p>

        <div className="mt-auto pt-5">
          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-faint">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" /> {course.rating || "New"}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {course.duration}
            </span>
            <span>·</span>
            <span>{course.lessons} lessons</span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-ink-line pt-4">
            <span className="text-sm font-semibold text-ink">
              {course.price}
            </span>
            <span className="text-xs font-medium text-ink-soft group-hover:text-ink transition-colors">
              View course →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}