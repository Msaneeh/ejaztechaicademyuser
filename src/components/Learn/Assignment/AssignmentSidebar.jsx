const Card = ({ children }) => (
  <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
    {children}
  </div>
);

const Label = ({ children }) => (
  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
    {children}
  </h3>
);

const AssignmentSidebar = ({ assignment, submission }) => {
  return (
    <div className="space-y-6">
      <Card>
        <Label>Submission status</Label>
        <p
          className={`text-sm font-medium ${
            submission ? "text-green-400" : "text-yellow-500"
          }`}
        >
          {submission ? "Submitted" : "Not submitted"}
        </p>
      </Card>

      <Card>
        <Label>Due date</Label>
        <p className="text-sm font-medium text-white">
          {assignment.dueDate || "Set by instructor"}
        </p>
      </Card>

      <Card>
        <Label>Grade</Label>
        <p className="text-sm font-medium text-white/70">
          {submission ? "Awaiting review" : "Available after submission"}
        </p>
      </Card>
    </div>
  );
};

export default AssignmentSidebar;