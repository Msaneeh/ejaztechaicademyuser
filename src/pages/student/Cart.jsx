import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Trash2,
  ShieldCheck,
  ShoppingCart,
  PlayCircle,
  Clock,
  BookOpen,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";

export default function Cart() {
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      // Auth Gate: Send to login, then bring them back to checkout
      navigate("/auth?redirect=/checkout");
      return;
    }
    navigate("/checkout");
  };

  // ---------------- Empty State ----------------
  if (cartItems.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center py-12 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-ink/5">
          <ShoppingCart className="h-10 w-10 text-ink-faint" />
        </div>
        <h1 className="text-2xl font-bold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Looks like you haven't added any paid courses to your cart yet.
        </p>
        <Link
          to="/explore"
          className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas transition hover:opacity-90"
        >
          Explore Courses
        </Link>
      </div>
    );
  }

  // ---------------- Cart Layout ----------------
  return (
    <div className="mx-auto max-w-6xl pb-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">Shopping Cart</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {cartItems.length} {cartItems.length === 1 ? "course" : "courses"} in cart
          </p>
        </div>
        <Link
          to="/explore"
          className="hidden items-center gap-2 text-sm font-medium text-ink hover:underline sm:flex"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        
        {/* ---------------- Left Column: Cart Items ---------------- */}
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

        {/* ---------------- Right Column: Order Summary ---------------- */}
        <div className="w-full shrink-0 lg:w-96">
          <div className="rounded-2xl border border-ink-line bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Order Summary</h2>
            
            <div className="mt-6 space-y-4 border-b border-ink-line pb-6 text-sm">
              <div className="flex items-center justify-between text-ink-soft">
                <span>Subtotal</span>
                <span className="font-medium text-ink">₦{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-ink-soft">
                <span>Discount</span>
                <span className="text-ink">₦0</span>
              </div>
              <div className="flex items-center justify-between text-ink-soft">
                <span>Taxes</span>
                <span className="text-ink">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-6">
              <span className="text-base font-semibold text-ink">Total</span>
              <span className="text-2xl font-bold text-ink">₦{cartTotal.toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-canvas transition hover:opacity-90"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-faint">
              <ShieldCheck className="h-4 w-4" />
              Secure checkout guaranteed
            </div>
          </div>

          {/* Continue Shopping (Mobile) */}
          <Link
            to="/explore"
            className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-ink hover:underline sm:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}