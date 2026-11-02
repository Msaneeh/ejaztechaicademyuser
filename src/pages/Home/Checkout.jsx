import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import SelectCourses from "@/components/CheckOut/SelectCourses";
import OrderSummary from "@/components/CheckOut/OrderSummary";
import PaymentModal from "@/components/CheckOut/PaymentModal";
import PaymentSuccess from "@/components/CheckOut/PaymentSuccess";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // Cart selection state
  const [selectedIds, setSelectedIds] = useState(
    cartItems.map((item) => item.id)
  );

  // Payment state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Total based only on selected items
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

  const handleInitiatePayment = (e) => {
    e.preventDefault();
    if (selectedIds.length === 0) return;
    setShowPaymentModal(true);
  };

  const handleProcessPayment = (event) => {
    event.preventDefault();
    setIsProcessing(true);

    // Simulate a 3-second API delay (e.g., contacting Paystack)
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      setPaymentSuccess(true);

      // Save purchased courses to enrollments
      const enrolled = JSON.parse(
        localStorage.getItem("ejaztech_enrollments") || "[]"
      );
      const newlyEnrolled = [...enrolled, ...selectedIds];
      localStorage.setItem(
        "ejaztech_enrollments",
        JSON.stringify(newlyEnrolled)
      );

      clearCart();

      // Redirect after 2 seconds of success screen
      setTimeout(() => {
        navigate("/my-learning");
      }, 2000);
    }, 3000);
  };

  // Empty cart guard (unless showing success)
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

  if (paymentSuccess) {
    return <PaymentSuccess courseCount={selectedIds.length} />;
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

      <form
        onSubmit={handleInitiatePayment}
        className="flex flex-col gap-8 lg:flex-row lg:items-start"
      >
        {/* Left: Select Courses & Payment Method */}
        <div className="flex-1 space-y-8">
          <SelectCourses
            cartItems={cartItems}
            selectedIds={selectedIds}
            toggleSelection={toggleSelection}
          />
        </div>

        {/* Right: Order Summary */}
        <div className="w-full shrink-0 lg:w-96">
          <OrderSummary
            selectedIds={selectedIds}
            cartItems={cartItems}
            selectedTotal={selectedTotal}
          />
        </div>
      </form>

      {showPaymentModal && (
        <PaymentModal
          total={selectedTotal}
          isProcessing={isProcessing}
          onClose={() => setShowPaymentModal(false)}
          onSubmit={handleProcessPayment}
        />
      )}
    </div>
  );
};

export default Checkout;