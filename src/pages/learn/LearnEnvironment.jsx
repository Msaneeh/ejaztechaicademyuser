import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { courses } from "@/mockData/courses";
import { quizKey } from "../../utils/utils";
import LessonView from "@/components/Learn/LessonView";
import LearnHeader from "@/components/Learn/LearnHeader";
import { DesktopSidebar, MobileSidebar } from "@/components/Learn/CourseSidebar";
import QuizView from "./QuizView";
import AssignmentView from "./AssignmentView";
import AIAssistant from "./AIAssistant";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useQuizEngine } from "@/hooks/useQuizEngine";
import { useAssignmentEngine } from "@/hooks/useAssignmentEngine";
import { useAIChat } from "@/hooks/useAIChat";

const LearnEnvironment = () => {
  const { courseId } = useParams();
  const course = courses.find(
    (c) => c.id === courseId || c.slug === courseId
  );

  // --- Layout state ---
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [activeActivity, setActiveActivity] = useState(null);
  const [lastLesson, setLastLesson] = useState(null);

  // --- Domain hooks ---
  const progress = useLessonProgress();
  const quiz = useQuizEngine(activeActivity);
  const assignment = useAssignmentEngine();
  const chat = useAIChat(() => activeActivity?.type ?? "course");

  const curriculum = course?.curriculum || [
    {
      title: "Module 1: Getting Started",
      lessons: [{ id: "l1", title: "Welcome", duration: "5:20" }],
    },
  ];

  // Boot first lesson
  useEffect(() => {
    if (!course || activeActivity) return;
    const firstModule = curriculum[0];
    const firstLesson = firstModule.lessons[0];
    setActiveActivity({
      type: "lesson",
      data: firstLesson,
      moduleTitle: firstModule.title,
    });
    setLastLesson({
      data: firstLesson,
      moduleTitle: firstModule.title,
    });
  }, [course, activeActivity, curriculum]);

  if (!course) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#0A0A0A] text-white">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link
          to="/explore"
          className="mt-6 rounded-lg bg-white px-6 py-2 text-sm font-medium text-black"
        >
          Back to Explore
        </Link>
      </div>
    );
  }

  // --- Handlers ---
  const handleSelectActivity = (type, data, moduleTitle) => {
    setActiveActivity({ type, data, moduleTitle });
    setSidebarOpen(false);
    quiz.setConfirmOpen(false);
    quiz.setReviewOpen(false);
    if (type === "lesson") setLastLesson({ data, moduleTitle });
  };

  const backToLesson = () => {
    const target = lastLesson || {
      data: curriculum[0].lessons[0],
      moduleTitle: curriculum[0].title,
    };
    handleSelectActivity("lesson", target.data, target.moduleTitle);
  };

  const renderMainContent = () => {
    if (!activeActivity) return null;

    if (activeActivity.type === "lesson") {
      return (
        <LessonView
          lesson={activeActivity.data}
          moduleTitle={activeActivity.moduleTitle}
          isComplete={progress.isComplete(activeActivity.data.id)}
          onMarkComplete={() =>
            progress.markComplete(activeActivity.data.id)
          }
        />
      );
    }

    if (activeActivity.type === "quiz") {
      return (
        <QuizView
          quiz={activeActivity.data}
          moduleTitle={activeActivity.moduleTitle}
          activeActivity={activeActivity}
          quizMeta={quiz.quizMeta}
          quizAnswers={quiz.quizAnswers}
          quizAttempts={quiz.quizAttempts}
          shownHints={quiz.shownHints}
          confirmOpen={quiz.confirmOpen}
          reviewOpen={quiz.reviewOpen}
          now={quiz.now}
          onBackToLesson={backToLesson}
          onStartQuiz={quiz.startQuiz}
          onAnswerSelect={quiz.selectAnswer}
          onGoToQuestion={(idx) =>
            quiz.goToQuestion(activeActivity.data, idx)
          }
          onHintToggle={quiz.toggleHint}
          onSubmitQuiz={() => quiz.submitQuiz(activeActivity.data)}
          onConfirmSubmit={quiz.setConfirmOpen}
          onCancelSubmit={() => quiz.setConfirmOpen(false)}
          onToggleReview={quiz.toggleReview}
          onRetryQuiz={(q) => quiz.startQuiz(q, { fresh: true })}
        />
      );
    }

    if (activeActivity.type === "assignment") {
      const a = activeActivity.data;
      return (
        <AssignmentView
          assignment={a}
          moduleTitle={activeActivity.moduleTitle}
          submission={assignment.submissions[quizKey(a)]}
          draft={assignment.drafts[quizKey(a)]}
          onDraftChange={assignment.updateDraft}
          onSubmit={assignment.submit}
          onEditSubmission={assignment.editSubmission}
          onBackToLesson={backToLesson}
        />
      );
    }
  };

  const sidebarProps = {
    curriculum,
    activeActivity,
    onSelect: handleSelectActivity,
    completed: progress.completed,
    quizStatus: quiz.quizStatus,
    assignmentStatus: assignment.getStatus,
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0A0A0A] text-white">
      <LearnHeader
        courseTitle={course.title}
        onOpenAI={() => setAiPanelOpen(true)}
        onOpenSidebar={() => setSidebarOpen(true)}
      />

      <div className="relative flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {renderMainContent()}
        </div>

        <DesktopSidebar {...sidebarProps} />
      </div>

      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        {...sidebarProps}
      />

      <AIAssistant
        open={aiPanelOpen}
        onClose={() => setAiPanelOpen(false)}
        messages={chat.messages}
        inputValue={chat.inputValue}
        onInputChange={chat.setInputValue}
        onSubmit={chat.sendMessage}
        contextTitle={activeActivity?.moduleTitle}
      />
    </div>
  );
}

export default LearnEnvironment;