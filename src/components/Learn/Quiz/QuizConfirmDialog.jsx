const QuizConfirmDialog = ({ unanswered, onKeepWorking, onSubmit }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
        <h3 className="text-lg font-semibold text-white">Submit your quiz?</h3>
        <p className="mt-2 text-sm text-white/70">
          {unanswered > 0
            ? `You haven't answered ${unanswered} ${unanswered === 1 ? "question" : "questions"}. Unanswered questions score zero.`
            : "You've answered every question."}{" "}
          You can't change your answers after you submit.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onKeepWorking} className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 hover:text-white">
            Keep working
          </button>
          <button onClick={onSubmit} className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Submit quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizConfirmDialog;