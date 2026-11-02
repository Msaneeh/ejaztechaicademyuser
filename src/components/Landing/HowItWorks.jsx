import { UserPlus, BookOpen, Award } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create your account",
    description:
      "One account. Every course. Start as a student, upgrade to a mentor anytime.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Enroll in a course",
    description:
      "Browse by category, preview the syllabus, and start learning in seconds.",
  },
  {
    number: "03",
    icon: Award,
    title: "Learn & get certified",
    description:
      "Complete lessons at your pace, track progress, and earn a verifiable certificate.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Three steps from curious to capable
          </h2>
        </div>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Connecting line — desktop only */}
          <div
            aria-hidden
            className="
              absolute left-0 right-0 top-8 hidden h-px
              bg-border lg:block
            "
          />

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {steps.map(({ number, icon: Icon, title, description }) => (
              <div
                key={number}
                className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                {/* Icon tile — sits on top of the connecting line */}
                <span
                  className="
                    relative z-10 inline-flex h-16 w-16 items-center justify-center
                    rounded-2xl border border-border
                    bg-background text-foreground
                  "
                >
                  <Icon className="h-6 w-6" />
                </span>

                {/* Step number */}
                <p
                  className="
                    mt-5 text-xs font-medium uppercase tracking-[0.2em]
                    text-muted-foreground
                  "
                >
                  Step {number}
                </p>

                <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                  {title}
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}