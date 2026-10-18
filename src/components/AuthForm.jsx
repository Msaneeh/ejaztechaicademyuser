import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

/* ---------- Schemas ---------- */
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function AuthForm({ mode = "login" }) {
  const isLogin = mode === "login";
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register: registerUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: isLogin
      ? { email: "", password: "" }
      : { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values) {
    setFormError("");
    try {
      if (isLogin) {
        await login({ email: values.email, password: values.password });
      } else {
        await registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        });
      }

      // Redirect to where the user came from, or /home
      const redirectTo = location.state?.from?.pathname || "/home";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setFormError(err?.message || "Something went wrong. Try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name — register only */}
      {!isLogin && (
        <Field label="Full name" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            placeholder="Aisha Bello"
            {...register("name")}
            className={inputClass(errors.name)}
          />
        </Field>
      )}

      {/* Email */}
      <Field label="Email" error={errors.email?.message}>
        <input
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register("email")}
          className={inputClass(errors.email)}
        />
      </Field>

      {/* Password */}
      <Field label="Password" error={errors.password?.message}>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete={isLogin ? "current-password" : "new-password"}
            placeholder="••••••••"
            {...register("password")}
            className={inputClass(errors.password) + " pr-10"}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              rounded-full p-1.5 text-muted-foreground
              transition hover:bg-secondary hover:text-foreground
            "
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </Field>

      {/* Confirm password — register only */}
      {!isLogin && (
        <Field
          label="Confirm password"
          error={errors.confirmPassword?.message}
        >
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className={inputClass(errors.confirmPassword)}
          />
        </Field>
      )}

      {/* Forgot password — login only */}
      {isLogin && (
        <div className="flex justify-end">
          <a
            href="/forgot-password"
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            Forgot password?
          </a>
        </div>
      )}

      {/* Form-level error */}
      {formError && (
        <p className="rounded-xl border border-border bg-secondary/60 px-3 py-2 text-xs text-foreground">
          {formError}
        </p>
      )}

      {/* Submit */}
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
        {isLogin ? "Sign in" : "Create account"}
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-foreground">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function inputClass(error) {
  return [
    "h-11 w-full rounded-xl border bg-background px-4",
    "text-sm text-foreground placeholder:text-muted-foreground",
    "outline-none transition",
    error
      ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
      : "border-border focus:border-foreground/30 focus:ring-2 focus:ring-foreground/5",
  ].join(" ");
}