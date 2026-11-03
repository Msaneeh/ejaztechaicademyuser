import { getQuizState } from "@/utils/quizSelectors";
import QuizIntro from "@/components/Learn/Quiz/QuizIntro";
import QuizTaking from "@/components/Learn/Quiz/QuizTaking";
import QuizResults from "@/components/Learn/Quiz/QuizResults";

const QuizView = (props) => {
  const { quiz } = props;
  const state = getQuizState(quiz, props);

  if (state.meta.phase === "intro") {
    return (
      <QuizIntro
        quiz={quiz}
        moduleTitle={props.moduleTitle}
        {...state}
        onBackToLesson={props.onBackToLesson}
        onStartQuiz={props.onStartQuiz}
      />
    );
  }

  if (state.meta.phase === "taking") {
    return (
      <QuizTaking
        quiz={quiz}
        moduleTitle={props.moduleTitle}
        {...state}
        shownHints={props.shownHints}
        confirmOpen={props.confirmOpen}
        now={props.now}
        onGoToQuestion={props.onGoToQuestion}
        onAnswerSelect={props.onAnswerSelect}
        onHintToggle={props.onHintToggle}
        onSubmitQuiz={props.onSubmitQuiz}
        onConfirmSubmit={props.onConfirmSubmit}
      />
    );
  }

  if (state.meta.phase === "results") {
    return (
      <QuizResults
        quiz={quiz}
        {...state}
        reviewOpen={props.reviewOpen}
        onBackToLesson={props.onBackToLesson}
        onToggleReview={props.onToggleReview}
        onRetryQuiz={props.onRetryQuiz}
      />
    );
  }

  return null;
};

export default QuizView;