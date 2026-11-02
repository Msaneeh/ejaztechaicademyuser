import { CheckCircle2 } from "lucide-react";

const MOCK_VIDEO_URL = "/demo.mp4";

const LessonView = ({ lesson, moduleTitle, isComplete, onMarkComplete }) => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full items-center justify-center bg-black p-4">
        <video
          controls
          className="max-h-[55vh] w-full max-w-6xl rounded-lg object-contain shadow-2xl"
          poster="/logo.jpg"
        >
          <source src={MOCK_VIDEO_URL} type="video/mp4" />
        </video>
      </div>
      <div className="w-full max-w-5xl p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
              {moduleTitle}
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-white">
              {lesson.title}
            </h1>
          </div>
          <button
            onClick={onMarkComplete}
            className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium text-white ${
              isComplete
                ? "bg-green-600/30"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            {isComplete ? "Completed" : "Mark Complete"}
          </button>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-white/70">
          In this lesson, we explore {lesson.title}. Follow along with the
          video.
        </p>
      </div>
    </div>
  );
};

export default LessonView;