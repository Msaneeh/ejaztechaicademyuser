import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-secondary/40 py-20 sm:py-24">
      {/* Subtle radial glow behind the panel */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.06),transparent_65%)]
          dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_65%)]
        "
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          {/* Glass panel */}
          <div
            className="
              w-full max-w-3xl rounded-3xl
              border border-border bg-background/70
              px-6 py-14 text-center shadow-sm
              backdrop-blur-xl
              sm:px-12 sm:py-16
            "
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Ready when you are
            </p>

            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Start learning today.
              <br />
              Build something real.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground">
              Join EjazTech.AI and get access to every course, the AI learning
              assistant, and a certificate when you finish.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/register"
                className="
                  group inline-flex h-12 items-center justify-center gap-2
                  rounded-full bg-primary px-7
                  text-sm font-medium text-primary-foreground
                  transition hover:opacity-90
                  focus:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                "
              >
                Start Learning — it's free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/teach"
                className="
                  inline-flex h-12 items-center justify-center
                  rounded-full border border-border bg-background
                  px-7 text-sm font-medium text-foreground
                  transition hover:bg-secondary
                  focus:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                "
              >
                Teach on EjazTech.AI
              </Link>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}