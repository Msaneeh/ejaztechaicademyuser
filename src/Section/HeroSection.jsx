import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle radial wash so the hero doesn't feel flat */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_top,rgba(10,10,10,0.06),transparent_60%)]
          dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]
        "
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------------- Left: copy ---------------- */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div
              className="
                inline-flex items-center gap-2 rounded-full
                border border-border bg-background/60 px-3 py-1
                text-xs font-medium text-muted-foreground
                backdrop-blur-md
              "
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>New cohort open · Autumn 2026</span>
            </div>

            {/* Headline */}
            <h1
              className="
                mt-6 text-balance text-5xl font-semibold tracking-tight
                text-foreground sm:text-6xl lg:text-7xl
              "
            >
              Learn. Build.
              <br />
              Ship real products.
            </h1>

            {/* Subheading */}
            <p className="mt-6 max-w-lg text-pretty text-base text-muted-foreground sm:text-lg">
              One account. Multiple courses. Mentors who actually mentor.
              From React to AI Engineering — build the skills that ship.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/auth"
                className="
                  group inline-flex h-11 items-center justify-center gap-2
                  rounded-full bg-primary px-6
                  text-sm font-medium text-primary-foreground
                  transition
                  hover:opacity-90
                  focus:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                "
              >
                Start Learning
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/teach"
                className="
                  inline-flex h-11 items-center justify-center
                  rounded-full border border-border bg-background
                  px-6 text-sm font-medium text-foreground
                  transition
                  hover:bg-secondary
                  focus:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                "
              >
                Teach on EjazTech.AI
              </Link>
            </div>

            {/* Trust line */}
            <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
              <Stat value="5+" label="Courses live" />
              <Stat value="12+" label="Mentors" />
              <Stat value="1k+" label="Lessons completed" />
            </dl>
          </div>

          {/* ---------------- Right: hero visual ---------------- */}
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Small stat primitive                                                */
/* ------------------------------------------------------------------ */
function Stat({ value, label }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="text-lg font-semibold text-foreground">{value}</dt>
      <dd className="text-muted-foreground">{label}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero visual: layered mock of the platform                           */
/* ------------------------------------------------------------------ */
function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Back card (decorative) */}
      <div
        aria-hidden
        className="
          absolute -left-4 top-6 hidden h-full w-full
          rounded-3xl border border-border bg-secondary/50
          sm:block
        "
      />

      {/* Front glass card — "Continue learning" mock */}
      <div
        className="
          relative rounded-3xl border border-border
          bg-background/70 p-6 shadow-sm backdrop-blur-xl
        "
      >
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Continue learning
          </p>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            In progress
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
          React.js Masterclass
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Module 3 · Context API
        </p>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Course progress</span>
            <span className="font-medium text-foreground">70%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-[70%] rounded-full bg-foreground" />
          </div>
        </div>

        {/* Lesson preview */}
        <div className="mt-6 space-y-2">
          <LessonRow title="What is React?" done />
          <LessonRow title="Setting up React" done />
          <LessonRow title="Context API" active />
          <LessonRow title="Performance" />
        </div>
      </div>

      {/* Floating AI bubble — echoes PRD §14 */}
      <div
        className="
          absolute -bottom-6 -right-2 hidden max-w-[240px] rounded-2xl
          border border-border bg-background/80 p-3 shadow-sm
          backdrop-blur-xl sm:block
        "
      >
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          AI assistant
        </p>
        <p className="mt-1 text-sm text-foreground">
          "Give me an example of Context API."
        </p>
      </div>
    </div>
  );
}

function LessonRow({ title, done, active }) {
  return (
    <div
      className={[
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
        active
          ? "bg-foreground text-primary-foreground"
          : "bg-secondary/60 text-foreground",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]",
          done
            ? "bg-foreground text-primary-foreground"
            : active
            ? "bg-primary-foreground/20 text-primary-foreground"
            : "border border-border text-muted-foreground",
        ].join(" ")}
      >
        {done ? "✓" : ""}
      </span>
      <span className={active ? "font-medium" : ""}>{title}</span>
    </div>
  );
}