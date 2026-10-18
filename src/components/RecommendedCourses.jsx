import SectionLabel from "./SectionLabel";
import { ChevronRight } from "lucide-react";
import RecommendedCard from "@/pages/student/Home/RecommendedCard";
import { Link } from "react-router-dom";

const RecommendedCourses = ({ recCourses}) => {
  return (
    <section>
        <div className="flex items-end justify-between">
          <SectionLabel>Recommended for you</SectionLabel>
          <Link
            to="/explore"
            className="group hidden items-center gap-1 text-sm font-medium text-ink transition hover:opacity-70 sm:inline-flex"
          >
            Explore all
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recCourses.map((course) => (
            <RecommendedCard key={course.id} course={course} />
          ))}
        </div>
      </section>
  )
}

export default RecommendedCourses