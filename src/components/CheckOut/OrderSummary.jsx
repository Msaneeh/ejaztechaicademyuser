import { ShieldCheck, Lock } from "lucide-react";

const OrderSummary = ({ selectedIds, cartItems, selectedTotal }) => {
  return (
    <div className="sticky top-24 rounded-2xl border border-ink-line bg-surface p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-ink">Order Summary</h2>

      <div className="mt-6 space-y-4 border-b border-ink-line pb-6 text-sm">
        {selectedIds.length === 0 ? (
          <p className="text-ink-faint italic">No courses selected</p>
        ) : (
          cartItems
            .filter((item) => selectedIds.includes(item.id))
            .map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-4 text-ink-soft"
              >
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
        <span className="text-2xl font-bold text-ink">
          ₦{selectedTotal.toLocaleString()}
        </span>
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
  );
};

export default OrderSummary;