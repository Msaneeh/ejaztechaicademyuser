
import {
  PlayCircle,
  Clock,
  Trash2,
  BookOpen,} from "lucide-react";

import { Link } from "react-router-dom";

const CartItems = ({ cartItems, removeFromCart }) => {
  return (
        <div className="flex-1 space-y-4">
          {cartItems.map((course) => (
            <div
              key={course.id}
              className="flex flex-col gap-5 rounded-2xl border border-ink-line bg-surface p-5 sm:flex-row sm:items-center"
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
                      className="text-base font-semibold text-ink hover:underline line-clamp-1"
                    >
                      {course.title}
                    </Link>
                    <p className="mt-1 text-xs text-ink-faint">By {course.mentor}</p>
                  </div>
                  <span className="shrink-0 text-base font-bold text-ink">
                    ₦{course.price.toLocaleString()}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-ink-soft">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" /> {course.lessons} lessons
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-ink-line pt-4">
                  <button
                    onClick={() => removeFromCart(course.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-red-600 transition hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
  )
}

export default CartItems