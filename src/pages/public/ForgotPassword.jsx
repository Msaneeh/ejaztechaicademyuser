import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import PasswordInput from "@/components/PasswordInput";

/* ---------------------------------------------------------------- */
/* Schemas                                                           */
/* ---------------------------------------------------------------- */

const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

const resetSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

/* ---------------------------------------------------------------- */
/* Page                                                              */
/* ---------------------------------------------------------------- */

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [stage, setStage] = useState("request"); // "request" | "sent" | "reset"
  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-screen bg-background">
      
      <div className="relative flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
       
        <Link
          to="/auth"
          className="
            group absolute left-6 top-6 inline-flex items-center gap-2
            rounded-full border border-ink-line bg-surface/80
            px-4 py-2
            text-sm font-semibold text-ink
            shadow-sm backdrop-blur-md transition-all
            hover:border-ink/30 hover:bg-surface hover:shadow-md
            focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20
            lg:left-16
          "
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Sign In</span>
        </Link>

        <div className="mx-auto w-full max-w-sm">
          
          <div
            to="/"
            className="inline-flex items-center transition-opacity hover:opacity-80"
            aria-label="EJAZTECH home"
          >
            <img
              src="/logo.jpg"
              alt="EJAZTECH.AI"
              className="h-20 w-auto rounded-full"
            />
          </div>

          {/* ---------------- Stage 1: Request ---------------- */}
          {stage === "request" && (
            <RequestStage
              onSent={(sentEmail) => {
                setEmail(sentEmail);
                setStage("sent");
              }}
            />
          )}

          {/* ---------------- Stage 2: Sent ---------------- */}
          {stage === "sent" && (
            <SentStage
              email={email}
              onContinue={() => setStage("reset")}
              onChangeEmail={() => setStage("request")}
            />
          )}

          {/* ---------------- Stage 3: Reset ---------------- */}
          {stage === "reset" && (
            <ResetStage
              onDone={() => navigate("/auth", { replace: true })}
            />
          )}
        </div>
      </div>

      
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center border-l border-border bg-secondary/40">
        <div className="max-w-md px-12 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Account recovery
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
            Let's get you
            <br />
            back in.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Enter the email you signed up with and we'll send you a secure
            link to reset your password.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Stage 1: Request reset link                                       */
/* ---------------------------------------------------------------- */

function RequestStage({ onSent }) {
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values) {
    setFormError("");
    try {
      // TODO: POST /api/auth/forgot-password { email }
      await new Promise((r) => setTimeout(r, 600)); // simulate network
      onSent(values.email);
    } catch (err) {
      setFormError(err?.message || "Something went wrong. Try again.");
    }
  }

  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Forgot password?
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register("email")}
            className={[
              "h-11 w-full rounded-xl border bg-background px-4",
              "text-sm text-foreground placeholder:text-muted-foreground",
              "outline-none transition",
              errors.email
                ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-border focus:border-foreground/30 focus:ring-2 focus:ring-foreground/5",
            ].join(" ")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {formError && (
          <p className="rounded-xl border border-border bg-secondary/60 px-3 py-2 text-xs text-foreground">
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            inline-flex h-11 w-full items-center justify-center gap-2
            rounded-full bg-primary px-6
            text-sm font-medium text-primary-foreground
            transition hover:opacity-90
            disabled:cursor-not-allowed disabled:opacity-60
            focus:outline-none focus-visible:ring-2
            focus-visible:ring-ring focus-visible:ring-offset-2
            focus-visible:ring-offset-background
          "
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Send reset link
        </button>
      </form>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Stage 2: Email sent confirmation                                  */
/* ---------------------------------------------------------------- */

function SentStage({ email, onContinue, onChangeEmail }) {
  return (
    <div className="mt-10">
      <div
        className="
          inline-flex h-12 w-12 items-center justify-center
          rounded-2xl border border-border bg-secondary
        "
      >
        <Mail className="h-5 w-5 text-foreground" />
      </div>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Check your email
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        We sent a reset link to{" "}
        <span className="font-medium text-foreground">{email}</span>. The link
        expires in 15 minutes.
      </p>

      <div className="mt-8 space-y-3">
        {/* Demo-only: simulate clicking the email link */}
        <button
          type="button"
          onClick={onContinue}
          className="
            inline-flex h-11 w-full items-center justify-center gap-2
            rounded-full bg-primary px-6
            text-sm font-medium text-primary-foreground
            transition hover:opacity-90
            focus:outline-none focus-visible:ring-2
            focus-visible:ring-ring focus-visible:ring-offset-2
            focus-visible:ring-offset-background
          "
        >
          <CheckCircle2 className="h-4 w-4" />
          I clicked the link — continue
        </button>

        <button
          type="button"
          onClick={onChangeEmail}
          className="
            inline-flex h-11 w-full items-center justify-center
            rounded-full border border-border bg-background
            px-6 text-sm font-medium text-foreground
            transition hover:bg-secondary
          "
        >
          Use a different email
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Didn't get it? Check spam, or{" "}
        <button
          type="button"
          onClick={onChangeEmail}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          try again
        </button>
        .
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Stage 3: Set new password                                         */
/* ---------------------------------------------------------------- */

function ResetStage({ onDone }) {
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(values) {
    setFormError("");
    try {
      // TODO: POST /api/auth/reset-password { token, password }
      await new Promise((r) => setTimeout(r, 600));
      setSuccess(true);
      setTimeout(() => onDone(), 1200);
    } catch (err) {
      setFormError(err?.message || "Something went wrong. Try again.");
    }
  }

  if (success) {
    return (
      <div className="mt-10">
        <div
          className="
            inline-flex h-12 w-12 items-center justify-center
            rounded-2xl border border-border bg-secondary
          "
        >
          <CheckCircle2 className="h-5 w-5 text-foreground" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Password updated
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Redirecting you to sign in…
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Set a new password
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a strong password you haven't used before.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
        <PasswordInput
          label="New password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          label="Confirm new password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {formError && (
          <p className="rounded-xl border border-border bg-secondary/60 px-3 py-2 text-xs text-foreground">
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            inline-flex h-11 w-full items-center justify-center gap-2
            rounded-full bg-primary px-6
            text-sm font-medium text-primary-foreground
            transition hover:opacity-90
            disabled:cursor-not-allowed disabled:opacity-60
            focus:outline-none focus-visible:ring-2
            focus-visible:ring-ring focus-visible:ring-offset-2
            focus-visible:ring-offset-background
          "
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Update password
        </button>
      </form>
    </>
  );
}