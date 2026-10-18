import RecentCourseCard from "@/pages/student/Home/RecentCourseCard";
import SectionLabel from "./SectionLabel";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const RecentCouses = ({ rectCourses }) => {
  return (
          <section>
        <div className="flex items-end justify-between">
          <SectionLabel>Recent courses</SectionLabel>
          <Link
            to="/my-learning"
            className="group hidden items-center gap-1 text-sm font-medium text-ink transition hover:opacity-70 sm:inline-flex"
          >
            View all
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {rectCourses.map((course) => (
            <RecentCourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
  )
};




export default RecentCouses;