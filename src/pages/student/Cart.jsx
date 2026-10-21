import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import CartEmptyState from "@/components/CartEmptyState";
import CartItems from "@/components/CartItems";
import CartOrder from "@/components/CartOrder";

const Cart = () => {
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
      <CartEmptyState />
    )
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

        <CartItems 
        cartItems={cartItems} 
        removeFromCart={removeFromCart} 
        />

        {/* ---------------- Right Column: Order Summary ---------------- */}
        <CartOrder cartTotal={cartTotal} handleCheckout={handleCheckout} />
      </div>
    </div>
  );
}

export default Cart;