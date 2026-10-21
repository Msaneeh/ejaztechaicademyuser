import { Link } from "react-router-dom"
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck, } from "lucide-react"

const CartOrder = ({ cartTotal, handleCheckout}) => {
  return (
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
  )
}

export default CartOrder