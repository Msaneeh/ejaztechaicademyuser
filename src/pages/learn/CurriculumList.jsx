// src/pages/learn/CurriculumList.jsx
import { PlayCircle, CheckCircle2, HelpCircle, ClipboardList } from "lucide-react";
import { quizKey } from "./utils";

const CurriculumList = ({
  curriculum,
  activeActivity,
  onSelect,
  completed,
  quizStatus,
  assignmentStatus,
}) => {


  return curriculum.map((module, mIdx) => (
    <div key={mIdx} className="border-b border-white/10">
      <div className="bg-white/5 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/70">{module.title}</p>
      </div>

      {/* Lessons */}
      {module.lessons?.map((lesson) => {
        const isActive = activeActivity?.type === "lesson" && activeActivity.data.id === lesson.id;
        const done = completed.has(`lesson:${lesson.id}`);
        return (
          <button
            key={lesson.id}
            onClick={() => onSelect("lesson", lesson, module.title)}
            className={`flex w-full items-start gap-3 border-l-2 p-4 text-left transition ${
              isActive ? "border-white bg-white/10" : "border-transparent hover:bg-white/5"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {done ? (
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              ) : (
                <PlayCircle className={`h-4 w-4 ${isActive ? "text-white" : "text-white/30"}`} />
              )}
            </div>
            <div>
              <p className={`text-sm ${isActive ? "font-medium text-white" : "text-white/70"}`}>{lesson.title}</p>
              <p className="mt-1 text-xs text-white/40">{lesson.duration}</p>
            </div>
          </button>
        );
      })}

      {/* Quiz */}
      {module.quiz && (
        <button
          onClick={() => onSelect("quiz", module.quiz, module.title)}
          className={`flex w-full items-start gap-3 border-l-2 p-4 text-left transition ${
            activeActivity?.type === "quiz" && quizKey(activeActivity.data) === quizKey(module.quiz)
              ? "border-blue-500 bg-white/10"
              : "border-transparent hover:bg-white/5"
          }`}
        >
          <div className="mt-0.5 shrink-0">
            <HelpCircle className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{module.quiz.title}</p>
            <p className="mt-1 text-xs text-blue-400">{quizStatus(module.quiz)}</p>
          </div>
        </button>
      )}

      {/* Assignment */}
      {module.assignment && (
        <button
          onClick={() => onSelect("assignment", module.assignment, module.title)}
          className={`flex w-full items-start gap-3 border-l-2 p-4 text-left transition ${
            activeActivity?.type === "assignment" && quizKey(activeActivity.data) === quizKey(module.assignment)
              ? "border-orange-500 bg-white/10"
              : "border-transparent hover:bg-white/5"
          }`}
        >
          <div className="mt-0.5 shrink-0">
            <ClipboardList className="h-4 w-4 text-orange-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{module.assignment.title}</p>
            <p className="mt-1 text-xs text-orange-400">{assignmentStatus(module.assignment)}</p>
          </div>
        </button>
      )}
    </div>
  ));
}

export default CurriculumList;