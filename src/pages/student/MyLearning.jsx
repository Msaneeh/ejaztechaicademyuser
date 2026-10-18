import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  PlayCircle,
  CheckCircle2,
  Clock,
  MoreVertical,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* MOCK DATA (Enrolled Courses)                                        */
/* ------------------------------------------------------------------ */
const enrolledCourses = [
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    mentor: "Eng. Ejaz",
    thumbnail: null,
    progress: 42,
    lessons: "12 of 28 lessons completed",
    status: "in-progress",
    lastAccessed: "2 hours ago",
  },
  {
    id: "ai-engineering",
    title: "AI Engineering",
    mentor: "Eng. Yusuf",
    thumbnail: null,
    progress: 15,
    lessons: "8 of 55 lessons completed",
    status: "in-progress",
    lastAccessed: "Yesterday",
  },
  {
    id: "html-css",
    title: "HTML & CSS Essentials",
    mentor: "Eng. Sarah",
    thumbnail: null,
    progress: 100,
    lessons: "16 of 16 lessons completed",
    status: "completed",
    lastAccessed: "3 days ago",
  },
  {
    id: "data-science",
    title: "Introduction to Data Science",
    mentor: "Eng. Maryam",
    thumbnail: null,
    progress: 0,
    lessons: "0 of 20 lessons completed",
    status: "not-started",
    lastAccessed: "Enrolled 1 week ago",
  },
];

const TABS = [
  { id: "all", label: "All courses" },
  { id: "in-progress", label: "In progress" },
  { id: "not-started", label: "Not started" },
  { id: "completed", label: "Completed" },
];

export default function MyLearning() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter based on tab AND search query
  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesTab = activeTab === "all" || course.status === activeTab;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.mentor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* ---------------- Header ---------------- */}
      <section>
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          My Learning
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Manage your learning journey in one place.
        </p>
      </section>

      {/* ---------------- Controls (Search + Tabs) ---------------- */}
      <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1 rounded-full border border-ink-line bg-surface p-1">
          {TABS.map((tab) => {
            const count =
              tab.id === "all"
                ? enrolledCourses.length
                : enrolledCourses.filter((c) => c.status === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition",
                  activeTab === tab.id
                    ? "bg-ink text-canvas"
                    : "text-ink-soft hover:bg-ink/5 hover:text-ink",
                ].join(" ")}
              >
                {tab.label}
                <span
                  className={[
                    "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px]",
                    activeTab === tab.id
                      ? "bg-canvas/20 text-canvas"
                      : "bg-ink/5 text-ink-faint",
                  ].join(" ")}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="search"
            placeholder="Search your courses..."
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

      {/* ---------------- Course List ---------------- */}
      <section>
        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-line py-20 text-center">
            <Search className="mb-4 h-10 w-10 text-ink-faint/50" />
            <h3 className="text-base font-semibold text-ink">No courses found</h3>
            <p className="mt-1 text-sm text-ink-soft">
              You don't have any courses matching this filter.
            </p>
            <Link
              to="/explore"
              className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-canvas transition hover:opacity-90"
            >
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <MyLearningCard key={course.id} course={course} />
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
function MyLearningCard({ course }) {
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
              {course.mentor} · {course.lessons}
            </p>
          </div>
          
          {/* Options Menu (Placeholder) */}
          <button className="hidden text-ink-faint hover:text-ink sm:block">
            <MoreVertical className="h-5 w-5" />
          </button>
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
              : isNotStarted
              ? "bg-ink text-canvas hover:opacity-90"
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