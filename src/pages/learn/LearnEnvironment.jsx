// src/pages/learn/LearnEnvironment.jsx
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, PlayCircle, CheckCircle2, Sparkles, X } from "lucide-react";
import { courses } from "@/mockData/courses";
import { parseMinutes, isCorrect, quizKey } from "./utils";
import CurriculumList from "./CurriculumList";
import QuizView from "./QuizView";
import AssignmentView from "./AssignmentView";
import AIAssistant from "./AIAssistant";

const MOCK_VIDEO_URL = "/demo.mp4";

export default function LearnEnvironment() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId || c.slug === courseId);

  // --- Layout state ---
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [activeActivity, setActiveActivity] = useState(null);
  const [lastLesson, setLastLesson] = useState(null);
  const [completed, setCompleted] = useState(() => new Set());

  // --- Quiz state ---
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizMeta, setQuizMeta] = useState({});
  const [quizAttempts, setQuizAttempts] = useState({});
  const [shownHints, setShownHints] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [now, setNow] = useState(Date.now());

  // --- Assignment state ---
  const [drafts, setDrafts] = useState({});
  const [submissions, setSubmissions] = useState({});

  // --- AI chat state ---
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const curriculum = course?.curriculum || [
    { title: "Module 1: Getting Started", lessons: [{ id: "l1", title: "Welcome", duration: "5:20" }] }
  ];

  // --- Initialization ---
  useEffect(() => {
    if (!course || activeActivity) return;
    const firstModule = curriculum[0];
    const firstLesson = firstModule.lessons[0];
    setActiveActivity({ type: "lesson", data: firstLesson, moduleTitle: firstModule.title });
    setLastLesson({ data: firstLesson, moduleTitle: firstModule.title });
  }, [course, activeActivity, curriculum]);

  // --- Quiz Timer ---
  const taking = activeActivity?.type === "quiz" && (quizMeta[quizKey(activeActivity.data)]?.phase === "taking");
  const endsAt = taking ? quizMeta[quizKey(activeActivity.data)].endsAt : null;

  useEffect(() => {
    if (!endsAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  useEffect(() => {
    if (endsAt && now >= endsAt) {
      const quiz = activeActivity.data;
      const answers = quizAnswers[quizKey(quiz)] || {};
      const score = quiz.questions.filter((q) => isCorrect(q, answers[q.id])).length;
      const percent = Math.round((score / quiz.questions.length) * 100);
      
      setQuizAttempts((prev) => ({
        ...prev,
        [quizKey(quiz)]: [...(prev[quizKey(quiz)] || []), { score, total: quiz.questions.length, percent, passed: percent >= (quiz.passMark ?? 50), answers }],
      }));
      setQuizMeta((prev) => ({ ...prev, [quizKey(quiz)]: { ...prev[quizKey(quiz)], phase: "results" } }));
    }
  }, [now, endsAt, activeActivity, quizAnswers]);

  if (!course) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#0A0A0A] text-white">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link to="/explore" className="mt-6 rounded-lg bg-white px-6 py-2 text-sm font-medium text-black">Back to Explore</Link>
      </div>
    );
  }

  // --- Handlers ---
  const handleSelectActivity = (type, data, moduleTitle) => {
    setActiveActivity({ type, data, moduleTitle });
    setSidebarOpen(false);
    setConfirmOpen(false);
    setReviewOpen(false);
    if (type === "lesson") setLastLesson({ data, moduleTitle });
  };

  const backToLesson = () => {
    const target = lastLesson || { data: curriculum[0].lessons[0], moduleTitle: curriculum[0].title };
    handleSelectActivity("lesson", target.data, target.moduleTitle);
  };

  const startQuiz = (quiz, { fresh, viewResults = false }) => {
    const minutes = parseMinutes(quiz.timeLimit);
    const meta = quizMeta[quizKey(quiz)] || { phase: "intro", index: 0, endsAt: null };
    if (fresh) setQuizAnswers((prev) => ({ ...prev, [quizKey(quiz)]: {} }));
    
    setQuizMeta((prev) => ({
      ...prev,
      [quizKey(quiz)]: {
        ...meta,
        phase: viewResults ? "results" : "taking",
        index: fresh ? 0 : meta.index || 0,
        endsAt: minutes && !viewResults ? Date.now() + minutes * 60000 : null,
      },
    }));
    setNow(Date.now());
  };

  const submitQuiz = () => {
    const quiz = activeActivity.data;
    const answers = quizAnswers[quizKey(quiz)] || {};
    const score = quiz.questions.filter((q) => isCorrect(q, answers[q.id])).length;
    const percent = Math.round((score / quiz.questions.length) * 100);
    
    setQuizAttempts((prev) => ({
      ...prev,
      [quizKey(quiz)]: [...(prev[quizKey(quiz)] || []), { score, total: quiz.questions.length, percent, passed: percent >= (quiz.passMark ?? 50), answers }],
    }));
    setQuizMeta((prev) => ({ ...prev, [quizKey(quiz)]: { ...prev[quizKey(quiz)], phase: "results" } }));
    setConfirmOpen(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: inputValue }]);
    setInputValue("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: `Hello! Ready to work on ${activeActivity?.type}?` }]);
    }, 1000);
  };

  const renderMainContent = () => {
    if (!activeActivity) return null;

    if (activeActivity.type === "lesson") {
      const lesson = activeActivity.data;
      const done = completed.has(`lesson:${lesson.id}`);

      
      return (
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full items-center justify-center bg-black p-4">
            <video controls className="max-h-[55vh] w-full max-w-6xl rounded-lg object-contain shadow-2xl" poster="/logo.jpg">
              <source src={MOCK_VIDEO_URL} type="video/mp4" />
            </video>
          </div>
          <div className="w-full max-w-5xl p-6 lg:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{activeActivity.moduleTitle}</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">{lesson.title}</h1>
              </div>
              <button onClick={() => setCompleted(prev => new Set(prev).add(`lesson:${lesson.id}`))} className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium text-white ${done ? "bg-green-600/30" : "bg-white/10 hover:bg-white/20"}`}>
                <CheckCircle2 className="h-4 w-4" /> {done ? "Completed" : "Mark Complete"}
              </button>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/70">In this lesson, we explore {lesson.title}. Follow along with the video.</p>
          </div>
        </div>
      );
    }

    if (activeActivity.type === "quiz") {
      return (
        <QuizView
          quiz={activeActivity.data}
          moduleTitle={activeActivity.moduleTitle}
          activeActivity={activeActivity}
          quizMeta={quizMeta}
          quizAnswers={quizAnswers}
          quizAttempts={quizAttempts}
          shownHints={shownHints}
          confirmOpen={confirmOpen}
          reviewOpen={reviewOpen}
          now={now}
          onBackToLesson={backToLesson}
          onStartQuiz={startQuiz}
          onAnswerSelect={(quiz, q, idx) => setQuizAnswers(prev => ({ ...prev, [quizKey(quiz)]: { ...prev[quizKey(quiz)], [q.id]: idx } }))}
          onGoToQuestion={(idx) => setQuizMeta(prev => ({ ...prev, [quizKey(activeActivity.data)]: { ...prev[quizKey(activeActivity.data)], index: idx } }))}
          onHintToggle={(id) => setShownHints(prev => ({ ...prev, [id]: true }))}
          onSubmitQuiz={submitQuiz}
          onConfirmSubmit={setConfirmOpen}
          onCancelSubmit={() => setConfirmOpen(false)}
          onToggleReview={() => setReviewOpen(v => !v)}
          onRetryQuiz={(quiz) => startQuiz(quiz, { fresh: true })}
        />
      );
    }

    if (activeActivity.type === "assignment") {
      return (
        <AssignmentView
          assignment={activeActivity.data}
          moduleTitle={activeActivity.moduleTitle}
          submission={submissions[quizKey(activeActivity.data)]}
          draft={drafts[quizKey(activeActivity.data)]}
          onDraftChange={(a, d) => setDrafts(prev => ({ ...prev, [quizKey(a)]: d }))}
          onSubmit={(a, d) => {
            setSubmissions(prev => ({ ...prev, [quizKey(a)]: { ...d, submittedAt: new Date() } }));
            setDrafts(prev => ({ ...prev, [quizKey(a)]: null }));
          }}
          onEditSubmission={(a, sub) => setDrafts(prev => ({ ...prev, [quizKey(a)]: sub }))}
          onBackToLesson={backToLesson}
        />
      );
    }
  };

  const quizStatus = (quiz) => {
    const attempts = quizAttempts[quizKey(quiz)] || [];
    if (!attempts.length) return "Quiz · Not attempted";
    return `Quiz · Best score ${Math.max(...attempts.map((a) => a.percent))}%`;
  };
  const assignmentStatus = (assignment) =>
    submissions[quizKey(assignment)] ? "Assignment · Submitted" : "Assignment · Not submitted";

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0A0A0A] text-white">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4">
        <div className="flex items-center gap-4">
          <Link to="/my-learning" className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white">
            <ArrowLeft className="h-5 w-5" /> <span className="hidden sm:inline">Back to Dashboard</span>
          </Link>
          <div className="h-5 w-px bg-white/20" />
          <h1 className="truncate text-sm font-semibold text-white">{course.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setAiPanelOpen(true)} className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
            <Sparkles className="h-4 w-4" /> AI Assistant
          </button>
          <button onClick={() => setSidebarOpen(true)} className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white hover:bg-white/20 lg:hidden">
            Course Content
          </button>
        </div>
      </header>

      <div className="relative flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {renderMainContent()}
        </div>

        <aside className="hidden w-80 shrink-0 border-l border-white/10 bg-[#141414] lg:block">
          <div className="flex h-14 items-center border-b border-white/10 px-4">
            <h2 className="text-sm font-semibold text-white">Course Content</h2>
          </div>
          <div className="h-[calc(100vh-7rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <CurriculumList
              curriculum={curriculum}
              activeActivity={activeActivity}
              onSelect={handleSelectActivity}
              completed={completed}
              quizStatus={quizStatus}
              assignmentStatus={assignmentStatus}
            />
          </div>
        </aside>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="h-full w-80 max-w-[85vw] bg-[#141414] shadow-2xl">
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
              <h2 className="text-sm font-semibold text-white">Course Content</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-white/50 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="h-[calc(100vh-3.5rem)] overflow-y-auto">
              <CurriculumList {...{ curriculum, activeActivity, onSelect: handleSelectActivity, completed, quizStatus, assignmentStatus }} />
            </div>
          </div>
        </div>
      )}

      <AIAssistant
        open={aiPanelOpen}
        onClose={() => setAiPanelOpen(false)}
        messages={messages}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSubmit={handleSendMessage}
        contextTitle={activeActivity?.moduleTitle}
      />
    </div>
  );
}