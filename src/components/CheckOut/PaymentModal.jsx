import { Lock, X, CreditCard, Loader2, ShieldCheck } from "lucide-react";

const PaymentModal = ({ total, isProcessing, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-gray-700">
              Secure Checkout
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700"
            disabled={isProcessing}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={onSubmit} className="p-6 space-y-5">
          <div className="text-center mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Amount to Pay
            </p>
            <p className="text-3xl font-bold text-gray-900">
              ₦{total.toLocaleString()}
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">
              Card Number
            </label>
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
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                Expiry
              </label>
              <input
                required
                type="text"
                placeholder="MM / YY"
                maxLength="5"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                CVV
              </label>
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
                `Pay ₦${total.toLocaleString()}`
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
  );
};

export default PaymentModal;