import { Link } from "react-router-dom";
import { ArrowRight, Plus, GripVertical, Video, FileText } from "lucide-react";

export default function MentorCallout() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------------- Left: copy ---------------- */}
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              For mentors
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Teach on EjazTech.AI
            </h2>

            <p className="mt-5 text-base text-muted-foreground sm:text-lg">
              Build your course the way you'd build a project — modules,
              lessons, videos, PDFs, GitHub links. Save a draft, preview,
              publish when it's ready.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              {[
                "Structure courses with modules and lessons",
                "Upload video, PDFs, slides, and external links",
                "Reorder content with a drag-and-drop builder",
                "Publish instantly or submit for review",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                to="/teach"
                className="
                  group inline-flex h-11 items-center justify-center gap-2
                  rounded-full bg-primary px-6
                  text-sm font-medium text-primary-foreground
                  transition hover:opacity-90
                  focus:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                "
              >
                Become a Mentor
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* ---------------- Right: course builder mock ---------------- */}
          <CourseBuilderMock />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mock of the mentor course builder                                   */
/* ------------------------------------------------------------------ */
function CourseBuilderMock() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Back card for depth */}
      <div
        aria-hidden
        className="
          absolute -right-4 top-6 hidden h-full w-full
          rounded-3xl border border-border bg-secondary/50
          sm:block
        "
      />

      {/* Front glass panel */}
      <div
        className="
          relative rounded-3xl border border-border
          bg-background/70 p-6 shadow-sm backdrop-blur-xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Course builder
            </p>
            <h3 className="mt-1 text-base font-semibold tracking-tight text-foreground">
              React.js Masterclass
            </h3>
          </div>
          <span
            className="
              rounded-full border border-border bg-secondary px-2.5 py-1
              text-[10px] font-medium text-muted-foreground
            "
          >
            Draft
          </span>
        </div>

        {/* Module tree */}
        <div className="mt-6 space-y-3">
          <ModuleBlock
            title="Module 1 — Introduction to React"
            lessons={[
              { title: "What is React?", type: "video" },
              { title: "Setting up React", type: "video" },
              { title: "Components", type: "doc" },
            ]}
          />

          <ModuleBlock
            title="Module 2 — React Fundamentals"
            lessons={[
              { title: "Props", type: "video" },
              { title: "State", type: "video" },
            ]}
          />

          {/* Add-module row */}
          <button
            type="button"
            className="
              flex w-full items-center justify-center gap-2 rounded-xl
              border border-dashed border-border bg-background/60
              px-3 py-3 text-xs font-medium text-muted-foreground
              transition hover:border-foreground/30 hover:text-foreground
            "
          >
            <Plus className="h-3.5 w-3.5" />
            Add module
          </button>
        </div>
      </div>
    </div>
  );
}

function ModuleBlock({ title, lessons }) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-3">
      {/* Module header */}
      <div className="flex items-center gap-2 px-1 py-1">
        <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
        <p className="text-xs font-medium text-foreground">{title}</p>
      </div>

      {/* Lessons */}
      <div className="mt-2 space-y-1.5">
        {lessons.map((lesson) => (
          <div
            key={lesson.title}
            className="
              flex items-center gap-2 rounded-lg
              bg-secondary/60 px-2.5 py-2
              text-xs text-foreground
            "
          >
            {lesson.type === "video" ? (
              <Video className="h-3.5 w-3.5 text-muted-foreground" />
            ) : (
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
            )}
            <span>{lesson.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}