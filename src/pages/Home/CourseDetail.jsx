import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCourseEnrollment } from "@/hooks/useCourseEnrollment";
import { courses } from "@/mockData/courses";
import CourseHero from "@/components/CourseDetail/CourseHero";
import CourseWhatYouLearn from "@/components/CourseDetail/CourseWhatYouLearn";
import CourseCurriculum from "@/components/CourseDetail/CourseCurriculum";
import CourseInstructor from "@/components/CourseDetail/CourseInstructor";
import CoursePurchaseCard from "@/components/CourseDetail/CoursePurchaseCard";

const CourseDetail = () => {
  const { courseId } = useParams();
  const { user } = useAuth();

  const course = courses.find((c) => c.id === courseId);
  const enrollment = useCourseEnrollment(course, user);

  if (!course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-ink-faint mb-4" />
        <h1 className="text-2xl font-bold text-ink">Course not found</h1>
        <p className="mt-2 text-ink-soft">
          The course you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/explore"
          className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-canvas"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  // Fallback curriculum (move this to mockData eventually)
  const curriculum = course.curriculum || [
    {
      title: "Introduction to the Course",
      lessons: [
        { title: `Welcome to ${course.title}`, duration: "5:20", isFreePreview: true },
        { title: "Setting up your environment", duration: "12:05", isFreePreview: true },
      ],
    },
    {
      title: "Core Concepts",
      lessons: [
        { title: "Understanding the Basics", duration: "15:10", isFreePreview: false },
        { title: "Practical Example", duration: "18:45", isFreePreview: false },
      ],
    },
  ];

  return (
    <div className="pb-16">
      <CourseHero course={course} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left column */}
          <div className="flex-1 py-10 lg:w-2/3">
            <CourseWhatYouLearn course={course} />
            <CourseCurriculum course={course} curriculum={curriculum} />
            <CourseInstructor course={course} />
          </div>

          {/* Right column */}
          <div className="relative w-full lg:w-1/3">
            <CoursePurchaseCard course={course} enrollment={enrollment} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CourseDetail;