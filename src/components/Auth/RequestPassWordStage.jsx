import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from 'lucide-react';


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

const RequestPassWordStage = ({ onSent }) => {
      const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values) => {
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

export default RequestPassWordStage