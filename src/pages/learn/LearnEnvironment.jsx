import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle2,
  Lock,
  ChevronDown,
  Bot,
  FileText,
  Paperclip,
  Send,
  X,
  MessageSquare,
} from "lucide-react";
import { courses } from "@/mockData/courses";

export default function LearnEnvironment() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === courseId);

  // Tabs state
  const [activeTab, setActiveTab] = useState("overview"); // overview | resources | ai
  
  // Sidebar state (mobile)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dummy curriculum for the UI
  const curriculum = course?.curriculum || [
    {
      title: "Getting Started",
      lessons: [
        { id: "l1", title: "Welcome to the course", duration: "5:20", completed: true },
        { id: "l2", title: "Setting up your environment", duration: "12:05", completed: true },
      ],
    },
    {
      title: "Core Concepts",
      lessons: [
        { id: "l3", title: "Understanding the basics", duration: "15:10", completed: false, active: true },
        { id: "l4", title: "Hands-on Practice", duration: "22:45", completed: false },
      ],
    },
  ];

  // Find the active lesson
  let activeLesson = null;
  curriculum.forEach(mod => {
    mod.lessons.forEach(les => {
      if (les.active) activeLesson = les;
    });
  });

  if (!activeLesson) activeLesson = { title: "Understanding the basics", duration: "15:10" };

  if (!course) {
    return <div className="p-10 text-center text-white">Course not found</div>;
  }

  return (
    <div className="flex h-full flex-col">
      {/* ---------------- Top Header ---------------- */}
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
            {course.title}
          </h1>
        </div>
        
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white hover:bg-white/20 lg:hidden"
        >
          Course Content
        </button>
      </header>

      {/* ---------------- Main Workspace ---------------- */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* --- Center: Video & Content --- */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* Mock Video Player Area */}
          <div className="relative aspect-video w-full shrink-0 bg-black flex items-center justify-center group cursor-pointer">
            <PlayCircle className="h-20 w-20 text-white/20 transition group-hover:scale-110 group-hover:text-white/50" />
            <div className="absolute bottom-4 left-4 rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur">
              {activeLesson.duration}
            </div>
          </div>

          {/* Lesson Content Tabs */}
          <div className="flex-1 bg-[#141414]">
            <div className="border-b border-white/10 px-6">
              <div className="flex gap-6">
                {["overview", "resources", "ai"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={[
                      "relative py-4 text-sm font-medium capitalize transition",
                      activeTab === tab ? "text-white" : "text-white/50 hover:text-white/80",
                    ].join(" ")}
                  >
                    {tab === "ai" ? "AI Assistant" : tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {/* Tab: Overview */}
              {activeTab === "overview" && (
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">
                      {activeLesson.title}
                    </h2>
                    <button className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20">
                      <CheckCircle2 className="h-4 w-4" />
                      Mark as Complete
                    </button>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    In this lesson, we will explore the fundamental concepts of {activeLesson.title.toLowerCase()}. 
                    Make sure to follow along with the video and try the exercises at the end. 
                    If you get stuck, don't forget to ask the AI Assistant!
                  </p>
                </div>
              )}

              {/* Tab: Resources */}
              {activeTab === "resources" && (
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-white mb-4">Lesson Resources</h2>
                  <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 cursor-pointer">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Slides.pdf</p>
                      <p className="text-xs text-white/50">2.4 MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 cursor-pointer">
                    <Paperclip className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Starter-Code.zip</p>
                      <p className="text-xs text-white/50">1.1 MB</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: AI Assistant (Inline) */}
              {activeTab === "ai" && (
                <div className="flex h-96 flex-col">
                  <div className="flex-1 space-y-4 overflow-y-auto pb-4">
                    {/* Chat Bubble: AI */}
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="rounded-2xl rounded-tl-sm bg-white/10 p-3 text-sm text-white/90">
                        Hi! I'm your AI tutor. I see you're on "{activeLesson.title}". What can I help you understand?
                      </div>
                    </div>
                  </div>
                  {/* Chat Input */}
                  <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/50 p-2">
                    <input 
                      type="text" 
                      placeholder="Ask a question..." 
                      className="flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-white/30"
                    />
                    <button className="rounded-lg bg-white p-2 text-black hover:bg-gray-200">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Right Sidebar: Curriculum (Desktop) --- */}
        <aside className="hidden w-80 shrink-0 border-l border-white/10 bg-[#141414] lg:block">
          <div className="flex h-14 items-center border-b border-white/10 px-4">
            <h2 className="text-sm font-semibold text-white">Course Content</h2>
          </div>
          <div className="h-[calc(100vh-7rem)] overflow-y-auto">
            {curriculum.map((module, i) => (
              <div key={i} className="border-b border-white/10">
                <div className="bg-white/5 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    {module.title}
                  </p>
                </div>
                <div>
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      className={[
                        "flex w-full items-start gap-3 border-l-2 p-4 text-left transition",
                        lesson.active
                          ? "border-white bg-white/10"
                          : "border-transparent hover:bg-white/5",
                      ].join(" ")}
                    >
                      <div className="mt-0.5 shrink-0">
                        {lesson.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : lesson.active ? (
                          <PlayCircle className="h-4 w-4 text-white" />
                        ) : (
                          <Lock className="h-4 w-4 text-white/30" />
                        )}
                      </div>
                      <div>
                        <p className={[
                          "text-sm",
                          lesson.active ? "font-medium text-white" : "text-white/70"
                        ].join(" ")}>
                          {lesson.title}
                        </p>
                        <p className="mt-1 text-xs text-white/40">{lesson.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

      </div>

      {/* --- Mobile Sidebar Drawer --- */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="h-full w-80 max-w-[85vw] bg-[#141414] shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
              <h2 className="text-sm font-semibold text-white">Course Content</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-white/50 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-[calc(100vh-3.5rem)] overflow-y-auto">
              {curriculum.map((module, i) => (
                <div key={i} className="border-b border-white/10">
                  <div className="bg-white/5 px-4 py-3">
                    <p className="text-xs font-semibold text-white/70">{module.title}</p>
                  </div>
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setSidebarOpen(false)}
                      className={[
                        "flex w-full items-start gap-3 border-l-2 p-4 text-left",
                        lesson.active ? "border-white bg-white/10" : "border-transparent hover:bg-white/5",
                      ].join(" ")}
                    >
                      <div className="mt-0.5 shrink-0">
                        {lesson.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : lesson.active ? (
                          <PlayCircle className="h-4 w-4 text-white" />
                        ) : (
                          <Lock className="h-4 w-4 text-white/30" />
                        )}
                      </div>
                      <div>
                        <p className={[
                          "text-sm",
                          lesson.active ? "font-medium text-white" : "text-white/70"
                        ].join(" ")}>{lesson.title}</p>
                        <p className="mt-1 text-xs text-white/40">{lesson.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}