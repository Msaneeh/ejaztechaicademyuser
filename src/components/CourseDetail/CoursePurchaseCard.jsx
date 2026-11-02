import { PlayCircle, ShoppingCart, BookOpen, Award } from "lucide-react";

const ActionButton = ({
  course,
  isEnrolled,
  isAdding,
  onGoToCourse,
  onEnrollFree,
  onAddToCart,
}) => {
  if (isEnrolled) {
    return (
      <button
        onClick={onGoToCourse}
        className="w-full rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-canvas transition hover:opacity-90 flex items-center justify-center gap-2"
      >
        <PlayCircle className="h-5 w-5" />
        Go to Course
      </button>
    );
  }

  const isFree = course.price === "Free" || course.price === 0;

  if (isFree) {
    return (
      <button
        onClick={onEnrollFree}
        className="w-full rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-canvas transition hover:opacity-90"
      >
        Enroll for Free
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-3xl font-bold text-ink">
        {typeof course.price === "number"
          ? `₦${course.price.toLocaleString()}`
          : course.price}
      </div>
      <button
        onClick={onAddToCart}
        disabled={isAdding}
        className="w-full rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-canvas transition hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-70"
      >
        <ShoppingCart className="h-5 w-5" />
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
      <p className="text-center text-xs text-ink-faint">
        30-Day Money-Back Guarantee
      </p>
    </div>
  );
};

const CoursePurchaseCard = ({ course, enrollment }) => {
  return (
    <div className="sticky top-24 -mt-24 rounded-2xl border border-ink-line bg-surface p-6 shadow-xl lg:-mt-64">
      {/* Thumbnail / Preview */}
      <div className="mb-6 aspect-video w-full overflow-hidden rounded-xl bg-ink/5 flex items-center justify-center relative group cursor-pointer">
        <PlayCircle className="h-12 w-12 text-ink-faint/50 group-hover:text-ink transition" />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition" />
        <span className="absolute bottom-3 text-xs font-medium text-ink">
          Watch Preview
        </span>
      </div>

      {/* Action */}
      <div className="mb-6">
        <ActionButton
          course={course}
          isEnrolled={enrollment.isEnrolled}
          isAdding={enrollment.isAdding}
          onGoToCourse={enrollment.goToCourse}
          onEnrollFree={enrollment.enrollFree}
          onAddToCart={enrollment.addToCartAndGo}
        />
      </div>

      {/* Course includes */}
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
  );
};

export default CoursePurchaseCard;