import { Link } from "react-router-dom";
import { ArrowLeft, Star, Clock, BookOpen } from "lucide-react";

const CourseHero = ({ course }) => {
  return (
    <div className="bg-[#0A0A0A] text-[#FAF8F5] dark:bg-[#141414] dark:border-b dark:border-ink-line">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="lg:w-2/3 lg:pr-12">
          <Link
            to="/explore"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wider text-white/80">
            <span>{course.category}</span>
            <span>·</span>
            <span>{course.difficulty}</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {course.title}
          </h1>

          <p className="mt-4 text-base text-white/80 sm:text-lg">
            {course.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Star className="h-4 w-4 fill-current" />
              {course.rating} rating
            </span>
            <span className="flex items-center gap-1.5 text-white/80">
              <BookOpen className="h-4 w-4" />
              {course.lessons} lessons
            </span>
            <span className="flex items-center gap-1.5 text-white/80">
              <Clock className="h-4 w-4" />
              {course.duration}
            </span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt={course.mentor}
              className="h-10 w-10 rounded-full border-2 border-white/20 object-cover"
            />
            <div>
              <p className="text-sm font-medium text-white">
                Created by {course.mentor}
              </p>
              <p className="text-xs text-white/60">Instructor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHero;