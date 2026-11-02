import { CheckCircle2 } from "lucide-react";

const CourseWhatYouLearn = ({ course }) => {
  const outcomes = [
    `Master the fundamentals of ${course.category}.`,
    `Apply ${course.title} concepts to real projects.`,
    "Build confidence through hands-on practice.",
    "Learn best practices from an industry expert.",
  ];

  return (
    <section className="rounded-2xl border border-ink-line bg-surface p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-ink mb-4">
        What you'll learn
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {outcomes.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm text-ink-soft"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-ink" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CourseWhatYouLearn;