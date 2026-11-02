import { CheckCircle2 } from "lucide-react";

const PaymentSuccess = ({ courseCount }) => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      <h1 className="text-3xl font-bold text-ink">Payment Successful!</h1>
      <p className="mt-2 text-ink-soft">
        You now have access to your new{" "}
        {courseCount === 1 ? "course" : "courses"}.
      </p>
      <p className="mt-6 text-sm text-ink-faint animate-pulse">
        Redirecting to your learning dashboard...
      </p>
    </div>
  );
};

export default PaymentSuccess;