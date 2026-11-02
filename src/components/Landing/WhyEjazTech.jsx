import { Bot, Users, BarChart3, Award } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI learning assistant",
    description:
      "An AI that knows exactly which lesson you're on — ask it to explain, summarize, or quiz you.",
  },
  {
    icon: Users,
    title: "Mentor-built courses",
    description:
      "Every course is created and maintained by a real mentor — not a template library.",
  },
  {
    icon: BarChart3,
    title: "Lesson-level progress",
    description:
      "Track what you've completed, resume exactly where you stopped, and see the path ahead.",
  },
  {
    icon: Award,
    title: "Certificates on completion",
    description:
      "Finish a course, get a verifiable certificate with a unique code you can share.",
  },
];

export default function WhyEjazTech() {
  return (
    <section className="border-y border-border bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Why EjazTech.AI
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A learning platform built for people who ship
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to go from curious to capable — without the
            noise.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="
                group flex flex-col rounded-2xl
                border border-border bg-background p-6
                transition
                hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm
              "
            >
              <span
                className="
                  inline-flex h-10 w-10 items-center justify-center
                  rounded-xl border border-border bg-secondary
                  text-foreground
                  transition-colors
                  group-hover:bg-foreground group-hover:text-primary-foreground
                "
              >
                <Icon className="h-5 w-5" />
              </span>

              <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}