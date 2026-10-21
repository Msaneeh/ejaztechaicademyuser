import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { courses } from "@/mockData/courses";
import SearchBar from "@/components/SearchBar";
import MyLearningCard from "@/components/MyLearningCard";
import GlobalEmptyState from "@/components/GlobalEmptyState";
import MylearningTabs from "@/components/MylearningTabs";

const TABS = [
  { id: "all", label: "All courses" },
  { id: "in-progress", label: "In progress" },
  { id: "not-started", label: "Not started" },
  { id: "completed", label: "Completed" },
];

const MyLearning = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const searchHandler = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const enrolledIds = JSON.parse(localStorage.getItem("ejaztech_enrollments") || "[]");
    
    const myCourses = courses.filter((c) => enrolledIds.includes(c.id)).map((c, index) => {
      const isFirst = index === 0;
      
      let status = "not-started";
      let progress = 0;
      
      if (isFirst && enrolledIds.length > 1) {
        status = "in-progress";
        progress = 42;
      }

      return {
        ...c,
        status: status,
        progress: progress,
        lessonText: `${Math.floor(progress / 100 * c.lessons)} of ${c.lessons} lessons completed`,
        lastAccessed: isFirst ? "2 hours ago" : "Enrolled recently",
      };
    });

    setEnrolledCourses(myCourses);
  }, []);

  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesTab = activeTab === "all" || course.status === activeTab;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.mentor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          My Learning
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Manage your learning journey in one place.
        </p>
      </section>

      {enrolledCourses.length === 0 ? (
        <GlobalEmptyState />
      ) : (
        <>
          <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* PASS THE MISSING PROPS HERE */}
            <MylearningTabs 
              Tabs={TABS} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              enrolledCourses={enrolledCourses} 
            />
            
            <SearchBar val={searchQuery} search={searchHandler} />
          </section>

          <section>
            {filteredCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-line py-20 text-center">
                <Search className="mb-4 h-10 w-10 text-ink-faint/50" />
                <h3 className="text-base font-semibold text-ink">No courses found</h3>
                <p className="mt-1 text-sm text-ink-soft">
                  You don't have any courses matching this filter.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <MyLearningCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default MyLearning;