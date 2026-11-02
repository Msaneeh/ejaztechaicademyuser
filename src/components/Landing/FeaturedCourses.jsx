import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { courses } from "@/mockData/courses";
import CourseCard from "@/components/CourseCard";

export default function FeaturedCourses() {
  const categories = ["All", "Frontend", "Backend", "AI", "Data"];
  const [active, setActive] = useState("All");

  const visible =
    active === "All"
      ? courses.slice(0, 4)
      : courses.filter((c) => c.category === active).slice(0, 4);

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Featured courses
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Courses you can start today
            </h2>
            <p className="mt-3 text-muted-foreground">
              Hand-picked, mentor-built, and structured for real progress.
            </p>
          </div>

          <Link
            to="/courses"
            className="
              group inline-flex items-center gap-2 text-sm font-medium
              text-foreground transition hover:opacity-70
            "
          >
            View all courses
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Category pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={[
                  "rounded-full border px-4 py-1.5 text-xs font-medium transition",
                  isActive
                    ? "border-foreground bg-foreground text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-secondary hover:text-foreground",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Empty state (rare, but safe) */}
        {visible.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No courses in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}