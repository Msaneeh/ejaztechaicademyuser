import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

const LearnHeader = ({ courseTitle, onOpenAI, onOpenSidebar }) => {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4">
      <div className="flex items-center gap-4">
        <Link
          to="/my-learning"
          className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Back to Dashboard</span>
        </Link>
        <div className="h-5 w-px bg-white/20" />
        <h1 className="truncate text-sm font-semibold text-white">
          {courseTitle}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenAI}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
        >
          <Sparkles className="h-4 w-4" /> AI Assistant
        </button>
        <button
          onClick={onOpenSidebar}
          className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white hover:bg-white/20 lg:hidden"
        >
          Course Content
        </button>
      </div>
    </header>
  );
};

export default LearnHeader;