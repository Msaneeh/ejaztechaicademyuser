import { useState } from "react";
import { Search } from "lucide-react";
import { courses } from "@/mockData/courses";
import SearchBar from "@/components/SearchBar";
import ExploreFilters from "@/components/ExploreFilters";
import CourseCard from "@/components/CourseCard";

const CATEGORIES = ["All", "Frontend", "Backend", "AI", "Data", "Design"];
const DIFFICULTIES = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const Explore = () => {
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
    setSearchQuery(event.target.value);
  };

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
        <SearchBar search={searchHandler} val={searchQuery} />

        {/* Pass ALL the required props properly here */}
        <ExploreFilters 
          categ={CATEGORIES} 
          activeCat={activeCategory} 
          setActiveCat={setActiveCategory} 
          activeDif={activeDifficulty}
          setActiDif={setActiveDifficulty}
          diffu={DIFFICULTIES} 
        />
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
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Explore;