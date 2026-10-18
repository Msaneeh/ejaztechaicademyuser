import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle2,
  Lock,
  Bot,
  FileText,
  Paperclip,
  Send,
  X,
  Check,
} from "lucide-react";
import { courses } from "@/mockData/courses";

// Mock video URL (Replace with your actual 2-minute video)
const MOCK_VIDEO_URL = "/demo.mp4"; 

export default function LearnEnvironment() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);

  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [curriculum, setCurriculum] = useState(
    course?.curriculum || [
      {
        title: "Module 1: Getting Started",
        lessons: [
          { id: "l1", title: "Welcome to the course", duration: "5:20", completed: true },
          { id: "l2", title: "Setting up your environment", duration: "12:05", completed: true },
          { id: "l3", title: "Course roadmap & resources", duration: "8:15", completed: false },
        ],
      },
      {
        title: "Module 2: Core Concepts",
        lessons: [
          { id: "l4", title: "Understanding the basics", duration: "15:10", completed: false, active: true },
          { id: "l5", title: "Hands-on Practice", duration: "22:45", completed: false },
          { id: "l6", title: "Common pitfalls to avoid", duration: "10:30", completed: false },
        ],
      },
      {
        title: "Module 3: Advanced Techniques",
        lessons: [
          { id: "l7", title: "Scaling your application", duration: "18:20", completed: false },
          { id: "l8", title: "Testing and debugging", duration: "16:40", completed: false },
        ],
      },
    ]
  );

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);

  let activeLesson = { title: "Understanding the basics", duration: "15:10" };
  curriculum.forEach(mod => {
    mod.lessons.forEach(les => {
      if (les.active) activeLesson = les;
    });
  });

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab]);

  useEffect(() => {
    if (activeTab === "ai" && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          text: `Hi! I'm your AI tutor. I see you're on the lesson "${activeLesson.title}". What can I help you understand today?`,
        },
      ]);
    }
  }, [activeTab, activeLesson.title, messages.length]);

  if (!course) {
    return <div className="p-10 text-center text-white">Course not found</div>;
  }

  const handleSelectLesson = (moduleIndex, lessonIndex) => {
    const newCurriculum = curriculum.map((mod, mIdx) => ({
      ...mod,
      lessons: mod.lessons.map((les, lIdx) => ({
        ...les,
        active: mIdx === moduleIndex && lIdx === lessonIndex,
      })),
    }));
    setCurriculum(newCurriculum);
    setSidebarOpen(false);
    setActiveTab("overview");
    setMessages([]);
  };

  const handleMarkComplete = () => {
    const newCurriculum = curriculum.map((mod) => ({
      ...mod,
      lessons: mod.lessons.map((les) => 
        les.active ? { ...les, completed: !les.completed } : les
      ),
    }));
    setCurriculum(newCurriculum);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newMessages = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setInputValue("");

    setTimeout(() => {
      let aiResponse = "";
      const lower = userText.toLowerCase();

      if (lower === "hi" || lower === "hello" || lower === "hey") {
        aiResponse = `Hello! Ready to dive into "${activeLesson.title}"? Ask me anything about it.`;
      } else if (lower.includes("example")) {
        aiResponse = `Here's a simple example related to ${activeLesson.title}: Imagine you are building a component that needs to...`;
      } else if (lower.includes("summarize") || lower.includes("summary")) {
        aiResponse = `To summarize "${activeLesson.title}": The key takeaway is to always ensure you understand the foundational concepts before moving to complex implementations.`;
      } else {
        aiResponse = `That's a great question about ${activeLesson.title}. In this context, the best approach is to break the problem down into smaller steps. Would you like me to explain further?`;
      }

      setMessages((prev) => [...prev, { role: "assistant", text: aiResponse }]);
    }, 1000);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* ---------------- Top Header ---------------- */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4 bg-[#0A0A0A]">
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
        <div className="flex flex-1 flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* Video Player Area (Constrained Height) */}
          <div className="w-full bg-black flex items-center justify-center p-4">
            <video 
              controls 
              className="max-h-[55vh] w-full max-w-5xl rounded-lg object-contain shadow-2xl"
              poster="/logo.jpg"
            >
              <source src={MOCK_VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
                    <button 
                      onClick={handleMarkComplete}
                      className={[
                        "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition",
                        activeLesson.completed 
                          ? "bg-green-600 text-white hover:bg-green-700" 
                          : "bg-white/10 text-white hover:bg-white/20"
                      ].join(" ")}
                    >
                      {activeLesson.completed ? <Check className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                      {activeLesson.completed ? "Completed" : "Mark as Complete"}
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

              {/* Tab: AI Assistant (Functional) */}
              {activeTab === "ai" && (
                <div className="flex h-[400px] flex-col">
                  <div className="flex-1 space-y-4 overflow-y-auto pb-4 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          msg.role === "assistant" ? "bg-blue-600" : "bg-white/20"
                        }`}>
                          {msg.role === "assistant" ? <Bot className="h-4 w-4 text-white" /> : <span className="text-xs text-white">You</span>}
                        </div>
                        <div className={`rounded-2xl p-3 text-sm ${
                          msg.role === "assistant" 
                            ? "rounded-tl-sm bg-white/10 text-white/90" 
                            : "rounded-tr-sm bg-blue-600 text-white"
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  
                  {/* Chat Input */}
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/50 p-2">
                    <input 
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask a question..." 
                      className="flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-white/30"
                    />
                    <button type="submit" className="rounded-lg bg-white p-2 text-black hover:bg-gray-200">
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
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
          
          {/* Hidden Scrollbar for Desktop Sidebar */}
          <div className="h-[calc(100vh-3.5rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {curriculum.map((module, mIdx) => (
              <div key={mIdx} className="border-b border-white/10">
                <div className="bg-white/5 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    {module.title}
                  </p>
                </div>
                <div>
                  {module.lessons.map((lesson, lIdx) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleSelectLesson(mIdx, lIdx)}
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
            <div className="h-[calc(100vh-3.5rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {curriculum.map((module, mIdx) => (
                <div key={mIdx} className="border-b border-white/10">
                  <div className="bg-white/5 px-4 py-3">
                    <p className="text-xs font-semibold text-white/70">{module.title}</p>
                  </div>
                  {module.lessons.map((lesson, lIdx) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleSelectLesson(mIdx, lIdx)}
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