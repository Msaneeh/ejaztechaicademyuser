import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Loader2,
  X,
  CreditCard,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Cart selection state
  const [selectedIds, setSelectedIds] = useState(
    cartItems.map((item) => item.id)
  );

  // Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Calculate total based ONLY on selected items
  const selectedTotal = useMemo(() => {
    return cartItems
      .filter((item) => selectedIds.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);
  }, [cartItems, selectedIds]);

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Triggered when clicking "Pay" on the main checkout page
  const handleInitiatePayment = (e) => {
    e.preventDefault();
    if (selectedIds.length === 0) return;
    setShowPaymentModal(true);
  };

  // Triggered inside the payment modal when submitting card details
  const handleProcessPayment = (event) => {
    event.preventDefault();
    setIsProcessing(true);
    
    // Simulate a 3-second API delay (e.g., contacting Paystack)
        // Simulate a 3-second API delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      setPaymentSuccess(true);
      
      // --- NEW CODE: Save purchased courses to enrollments ---
      const enrolled = JSON.parse(localStorage.getItem("ejaztech_enrollments") || "[]");
      const newlyEnrolled = [...enrolled, ...selectedIds];
      localStorage.setItem("ejaztech_enrollments", JSON.stringify(newlyEnrolled));
      // -------------------------------------------------------

      clearCart();

      // Redirect after 2 seconds of showing the success screen
      setTimeout(() => {
        navigate("/my-learning");
      }, 2000);
    }, 3000);
  };

  // Redirect if cart is empty (unless we are showing success screen)
  if (cartItems.length === 0 && !paymentSuccess) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-ink">Your cart is empty</h2>
        <Link to="/explore" className="mt-4 text-ink underline">
          Go back to courses
        </Link>
      </div>
    );
  }

  // ---------------- Success Screen ----------------
  if (paymentSuccess) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold text-ink">Payment Successful!</h1>
        <p className="mt-2 text-ink-soft">
          You now have access to your new {selectedIds.length === 1 ? "course" : "courses"}.
        </p>
        <p className="mt-6 text-sm text-ink-faint animate-pulse">
          Redirecting to your learning dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl pb-16 pt-8">
      <div className="mb-8">
        <Link
          to="/cart"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">Checkout</h1>
      </div>

      <form onSubmit={handleInitiatePayment} className="flex flex-col gap-8 lg:flex-row lg:items-start">
        
        {/* ---------------- Left Column: Select Courses & Payment ---------------- */}
        <div className="flex-1 space-y-8">
          
          <section className="rounded-2xl border border-ink-line bg-surface p-6">
            <h2 className="text-lg font-semibold text-ink mb-4">
              1. Select courses to pay for
            </h2>
            <div className="space-y-3">
              {cartItems.map((course) => {
                const isSelected = selectedIds.includes(course.id);
                return (
                  <label
                    key={course.id}
                    className={[
                      "flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition",
                      isSelected
                        ? "border-ink bg-ink/[0.02]"
                        : "border-ink-line hover:border-ink/30",
                    ].join(" ")}
                  >
                    <div className="flex h-5 items-center mt-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelection(course.id)}
                        className="h-5 w-5 rounded border-ink-line text-ink focus:ring-ink"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-ink">{course.title}</p>
                      <p className="text-xs text-ink-faint">By {course.mentor}</p>
                    </div>
                    <div className="font-semibold text-ink">
                      ₦{course.price.toLocaleString()}
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-ink-line bg-surface p-6">
            <h2 className="text-lg font-semibold text-ink mb-4">
              2. Payment Method
            </h2>
            
            <div className="space-y-4">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink bg-ink/[0.02] p-4">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                  className="h-4 w-4 text-ink focus:ring-ink"
                />
                <div className="flex flex-1 items-center justify-between">
                  <span className="font-medium text-ink">Paystack</span>
                  <span className="text-xs text-ink-faint">Cards, Bank Transfer, USSD</span>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* ---------------- Right Column: Order Summary ---------------- */}
        <div className="w-full shrink-0 lg:w-96">
          <div className="sticky top-24 rounded-2xl border border-ink-line bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Order Summary</h2>
            
            <div className="mt-6 space-y-4 border-b border-ink-line pb-6 text-sm">
              {selectedIds.length === 0 ? (
                <p className="text-ink-faint italic">No courses selected</p>
              ) : (
                cartItems
                  .filter((item) => selectedIds.includes(item.id))
                  .map((item) => (
                    <div key={item.id} className="flex justify-between gap-4 text-ink-soft">
                      <span className="line-clamp-1">{item.title}</span>
                      <span className="shrink-0 font-medium text-ink">
                        ₦{item.price.toLocaleString()}
                      </span>
                    </div>
                  ))
              )}
            </div>

            <div className="flex items-center justify-between py-6">
              <span className="text-base font-semibold text-ink">Total due</span>
              <span className="text-2xl font-bold text-ink">₦{selectedTotal.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              disabled={selectedIds.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-canvas transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Lock className="h-4 w-4" />
              Pay ₦{selectedTotal.toLocaleString()}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-faint">
              <ShieldCheck className="h-4 w-4" />
              100% Secure Payment
            </div>
          </div>
        </div>

      </form>

      {/* ========================================================= */}
      {/* PAYMENT GATEWAY MODAL (Simulating Paystack/Flutterwave)    */}
      {/* ========================================================= */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">Secure Checkout</span>
              </div>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-700"
                disabled={isProcessing}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleProcessPayment} className="p-6 space-y-5">
              <div className="text-center mb-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Amount to Pay</p>
                <p className="text-3xl font-bold text-gray-900">₦{selectedTotal.toLocaleString()}</p>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    required
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    maxLength="19"
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">Expiry</label>
                  <input
                    required
                    type="text"
                    placeholder="MM / YY"
                    maxLength="5"
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">CVV</label>
                  <input
                    required
                    type="password"
                    placeholder="123"
                    maxLength="3"
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ₦${selectedTotal.toLocaleString()}`
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-2">
                <ShieldCheck className="h-3 w-3" />
                PCI-DSS Compliant. Your details are encrypted.
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}