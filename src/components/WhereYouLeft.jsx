import SectionLabel from "./SectionLabel"
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const WhereYouLeft = ({ course }) => {
  return (
    <section>
        <SectionLabel>Pick up where you left off</SectionLabel>

        <div className="mt-4 overflow-hidden rounded-2xl border border-ink-line bg-surface p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-ink-soft">
                  <Sparkles className="h-3 w-3" />
                  In progress
                </span>
                <span className="text-xs text-ink-faint">
                  {course.module}
                </span>
              </div>

              <h2 className="mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {course.title}
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                Next lesson: {course.lastLesson}
              </p>

              <div className="mt-5 max-w-md">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-soft">
                    {course.progress}% complete
                  </span>
                  <span className="text-ink-faint">
                    {course.mentor}
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/5">
                  <div
                    className="h-full rounded-full bg-ink"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <Link
              to={`/learn/${course.id}`}
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-canvas transition hover:opacity-90"
            >
              Continue
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
  )
}

export default WhereYouLeft