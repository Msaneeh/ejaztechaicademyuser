import { useState } from "react";
import { PlayCircle, Lock, ChevronDown } from "lucide-react";

const CourseCurriculum = ({ course, curriculum }) => {
  const [openModuleIndex, setOpenModuleIndex] = useState(0);

  return (
    <section className="mt-10">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-xl font-semibold text-ink">Course content</h2>
        <span className="text-sm text-ink-soft">
          {curriculum.length} modules · {course.lessons} lessons
        </span>
      </div>

      <div className="rounded-2xl border border-ink-line bg-surface overflow-hidden">
        {curriculum.map((module, index) => {
          const isOpen = openModuleIndex === index;
          return (
            <div
              key={index}
              className="border-b border-ink-line last:border-0"
            >
              <button
                onClick={() => setOpenModuleIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between p-4 bg-ink/[0.02] hover:bg-ink/5 transition text-left"
              >
                <div className="flex items-center gap-3 font-medium text-ink">
                  <ChevronDown
                    className={`h-4 w-4 text-ink-faint transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                  {module.title}
                </div>
                <span className="text-xs text-ink-faint">
                  {module.lessons.length} lessons
                </span>
              </button>

              {isOpen && (
                <div className="divide-y divide-ink-line border-t border-ink-line">
                  {module.lessons.map((lesson, lIndex) => (
                    <div
                      key={lIndex}
                      className="flex items-center justify-between px-10 py-3 text-sm hover:bg-ink/[0.01]"
                    >
                      <div className="flex items-center gap-3 text-ink-soft">
                        {lesson.isFreePreview ? (
                          <PlayCircle className="h-4 w-4 text-ink" />
                        ) : (
                          <Lock className="h-4 w-4 text-ink-faint" />
                        )}
                        <span>{lesson.title}</span>
                      </div>
                      <span className="text-xs text-ink-faint">
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CourseCurriculum;