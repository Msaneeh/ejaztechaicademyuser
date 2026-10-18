import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Clock,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Lock,
  ChevronDown,
  Award,
  ShoppingCart,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { courses } from "@/mockData/courses"; 
import { useCart } from "@/context/CartContext"; 

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  
  // Find the course dynamically based on URL
  const course = courses.find((c) => c.id === courseId);
  
  const [openModuleIndex, setOpenModuleIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);


  // 404 if course ID is wrong
  if (!course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-ink-faint mb-4" />
        <h1 className="text-2xl font-bold text-ink">Course not found</h1>
        <p className="mt-2 text-ink-soft">The course you are looking for does not exist or has been removed.</p>
        <Link to="/explore" className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-canvas">
          Browse Courses
        </Link>
      </div>
    );
  }

  // --- Action Handlers ---
   const handleEnrollFree = () => {
    if (!user) {
      navigate(`/auth?redirect=/courses/${course.id}`);
      return;
    }
    
    // 1. Get current enrollments from local storage
    const enrolled = JSON.parse(localStorage.getItem("ejaztech_enrollments") || "[]");
    
    // 2. Add this course if not already there
    if (!enrolled.includes(course.id)) {
      localStorage.setItem("ejaztech_enrollments", JSON.stringify([...enrolled, course.id]));
    }

    alert(`Successfully enrolled in ${course.title}!`);
    navigate(`/learn/${course.id}`);
  };

     const handleAddToCart = () => {
    if (!user) {
      navigate(`/auth?redirect=/courses/${course.id}`);
      return;
    }
    
    setIsAdding(true);
    // Add to context
    addToCart(course);
    
    setTimeout(() => {
      setIsAdding(false);
      navigate("/cart");
    }, 600);
  };

  const handleGoToCourse = () => {
    navigate(`/learn/${course.id}`);
  };

  // --- Render Action Button ---
  const renderActionButton = () => {
    // For demo purposes, let's pretend they are not enrolled yet
    const isEnrolled = false; 

    if (isEnrolled) {
      return (
        <button
          onClick={handleGoToCourse}
          className="w-full rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-canvas transition hover:opacity-90 flex items-center justify-center gap-2"
        >
          <PlayCircle className="h-5 w-5" />
          Go to Course
        </button>
      );
    }

    // Check if price is string "Free" OR number 0
    const isFree = course.price === "Free" || course.price === 0;

    if (isFree) {
      return (
        <button
          onClick={handleEnrollFree}
          className="w-full rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-canvas transition hover:opacity-90"
        >
          Enroll for Free
        </button>
      );
    }

    // Paid logic (Ready for future)
    return (
      <div className="space-y-3">
        <div className="text-3xl font-bold text-ink">
          {/* If price is a number, format it with ₦ */}
          {typeof course.price === "number" ? `₦${course.price.toLocaleString()}` : course.price}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-canvas transition hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          <ShoppingCart className="h-5 w-5" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
        <p className="text-center text-xs text-ink-faint">30-Day Money-Back Guarantee</p>
      </div>
    );
  };

  // Create a mock curriculum since your data doesn't have it yet
  const mockCurriculum = course.curriculum || [
    {
      title: "Introduction to the Course",
      lessons: [
        { title: "Welcome to " + course.title, duration: "5:20", isFreePreview: true },
        { title: "Setting up your environment", duration: "12:05", isFreePreview: true },
      ]
    },
    {
      title: "Core Concepts",
      lessons: [
        { title: "Understanding the Basics", duration: "15:10", isFreePreview: false },
        { title: "Practical Example", duration: "18:45", isFreePreview: false },
      ]
    }
  ];

  return (
    <div className="pb-16">
      {/* ---------------- Top Header (Dark Background) ---------------- */}
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
                <p className="text-sm font-medium text-white">Created by {course.mentor}</p>
                <p className="text-xs text-white/60">Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Main Content & Sticky Sidebar ---------------- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          
          {/* --- Left Column: Details --- */}
          <div className="flex-1 py-10 lg:w-2/3">
            
            {/* What you'll learn (Fallback generated if missing) */}
            <section className="rounded-2xl border border-ink-line bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-ink mb-4">What you'll learn</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  `Master the fundamentals of ${course.category}.`,
                  `Apply ${course.title} concepts to real projects.`,
                  "Build confidence through hands-on practice.",
                  "Learn best practices from an industry expert."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink-soft">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-ink" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Curriculum (Uses mockCurriculum if missing in data) */}
            <section className="mt-10">
              <div className="flex items-end justify-between mb-4">
                <h2 className="text-xl font-semibold text-ink">Course content</h2>
                <span className="text-sm text-ink-soft">
                  {mockCurriculum.length} modules · {course.lessons} lessons
                </span>
              </div>

              <div className="rounded-2xl border border-ink-line bg-surface overflow-hidden">
                {mockCurriculum.map((module, index) => {
                  const isOpen = openModuleIndex === index;
                  return (
                    <div key={index} className="border-b border-ink-line last:border-0">
                      <button
                        onClick={() => setOpenModuleIndex(isOpen ? -1 : index)}
                        className="flex w-full items-center justify-between p-4 bg-ink/[0.02] hover:bg-ink/5 transition text-left"
                      >
                        <div className="flex items-center gap-3 font-medium text-ink">
                          <ChevronDown className={`h-4 w-4 text-ink-faint transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          {module.title}
                        </div>
                        <span className="text-xs text-ink-faint">{module.lessons.length} lessons</span>
                      </button>

                      {isOpen && (
                        <div className="divide-y divide-ink-line border-t border-ink-line">
                          {module.lessons.map((lesson, lIndex) => (
                            <div key={lIndex} className="flex items-center justify-between px-10 py-3 text-sm hover:bg-ink/[0.01]">
                              <div className="flex items-center gap-3 text-ink-soft">
                                {lesson.isFreePreview ? (
                                  <PlayCircle className="h-4 w-4 text-ink" />
                                ) : (
                                  <Lock className="h-4 w-4 text-ink-faint" />
                                )}
                                <span>{lesson.title}</span>
                              </div>
                              <span className="text-xs text-ink-faint">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Instructor */}
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-ink mb-4">Instructor</h2>
              <div className="rounded-2xl border border-ink-line bg-surface p-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/logo.jpg"
                    alt={course.mentor}
                    className="h-16 w-16 rounded-full border border-ink-line object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{course.mentor}</h3>
                    <p className="text-sm text-ink-soft">Expert Instructor</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {course.mentor} is an industry expert specializing in {course.category}. 
                  They have years of experience building real-world applications and are passionate about teaching the next generation of developers.
                </p>
              </div>
            </section>

          </div>

          {/* --- Right Column: Sticky Purchase Card --- */}
          <div className="relative w-full lg:w-1/3">
            <div className="sticky top-24 -mt-24 rounded-2xl border border-ink-line bg-surface p-6 shadow-xl lg:-mt-64">
              
              {/* Thumbnail / Preview */}
              <div className="mb-6 aspect-video w-full overflow-hidden rounded-xl bg-ink/5 flex items-center justify-center relative group cursor-pointer">
                <PlayCircle className="h-12 w-12 text-ink-faint/50 group-hover:text-ink transition" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition" />
                <span className="absolute bottom-3 text-xs font-medium text-ink">Watch Preview</span>
              </div>

              {/* Action Button Area */}
              <div className="mb-6">
                {renderActionButton()}
              </div>

              {/* Course Includes */}
              <div className="space-y-3 text-sm text-ink-soft">
                <p className="font-semibold text-ink mb-2">This course includes:</p>
                <div className="flex items-center gap-3">
                  <PlayCircle className="h-4 w-4" /> {course.duration} on-demand video
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4" /> Downloadable resources
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-4 w-4" /> Certificate of completion
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}