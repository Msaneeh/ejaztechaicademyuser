import { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { Button } from "@base-ui/react";
import { ArrowLeft } from "lucide-react"

export default function Auth() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const isLogin = mode === "login";

  return (
    <div className="flex min-h-screen bg-background">    
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
     <Link
          to="/"
          className="
            group absolute left-6 top-6 inline-flex items-center gap-2
            rounded-full border border-ink-line bg-surface/80
            px-4 py-2
            text-sm font-semibold text-ink
            shadow-sm backdrop-blur-md
            transition-all
            hover:border-ink/30 hover:bg-surface hover:shadow-md
            focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20
            lg:left-16
          "
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
        <div className="mx-auto w-full max-w-sm">
          {/* Brand */}
          <Link
            to="/"
            className="inline-flex items-center transition-opacity hover:opacity-80"
            aria-label="EJAZTECH home"
          >
            <img src="/logo.jpg" alt="EJAZTECH.AI" className="h-12 w-auto rounded-full" />
          </Link>

          {/* Heading */}
          <div className="mt-10">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isLogin
                ? "Sign in to continue learning."
                : "Start learning in less than a minute."}
            </p>
          </div>

          {/* Form */}
          <div className="mt-8">
            <AuthForm mode={mode} />
          </div>

          {/* Switch mode */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {isLogin ? (
              <>
                New to EjazTech.AI?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* ---------- Right: visual side (desktop only) ---------- */}
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center border-l border-border bg-secondary/40">
        <div className="max-w-md px-12 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Automate · Innovate · Educate
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
            One account.
            <br />
            Every course.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Mentor-led courses, lesson-level progress, an AI assistant that
            knows exactly which lesson you're on — and certificates when you
            finish.
          </p>
        </div>
      </div>
    </div>
  );
}