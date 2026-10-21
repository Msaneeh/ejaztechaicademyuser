import { useState, useEffect } from "react";
import { courses } from "@/mockData/courses"; // Import global data
import SearchBar from "@/components/SearchBar";
import WishlistCard from "@/components/WishlistCard";
import WishListEmptyState from "@/components/WishListEmptyState";

export default function Wishlist() {
  const [savedCourses, setSavedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchHandler = (event) => {
    setSearchQuery(event.target.value)
  }
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
          <SearchBar search={searchHandler} val={searchQuery} />
        </section>
      )}

      {/* ---------------- Course List ---------------- */}
      <section>
        {savedCourses.length === 0 ? (
          /* Empty State (No items saved) */
          <WishListEmptyState />
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
