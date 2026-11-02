import { X } from "lucide-react";
import CurriculumList from "@/pages/learn/CurriculumList";

const SidebarContent = ({
  curriculum,
  activeActivity,
  onSelect,
  completed,
  quizStatus,
  assignmentStatus,
}) => (
  <CurriculumList
    curriculum={curriculum}
    activeActivity={activeActivity}
    onSelect={onSelect}
    completed={completed}
    quizStatus={quizStatus}
    assignmentStatus={assignmentStatus}
  />
);

export function DesktopSidebar(props) {
  return (
    <aside className="hidden w-80 shrink-0 border-l border-white/10 bg-[#141414] lg:block">
      <div className="flex h-14 items-center border-b border-white/10 px-4">
        <h2 className="text-sm font-semibold text-white">Course Content</h2>
      </div>
      <div className="h-[calc(100vh-7rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <SidebarContent {...props} />
      </div>
    </aside>
  );
}

export function MobileSidebar({ open, onClose, ...props }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden">
      <div className="h-full w-80 max-w-[85vw] bg-[#141414] shadow-2xl">
        <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
          <h2 className="text-sm font-semibold text-white">Course Content</h2>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="h-[calc(100vh-3.5rem)] overflow-y-auto">
          <SidebarContent {...props} />
        </div>
      </div>
    </div>
  );
}
