import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const CartEmptyState = () => {
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

export default CartEmptyState