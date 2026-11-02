import { DEFAULT_REQUIREMENTS } from "@/utils/assignmentValidation";

const AssignmentInstructions = ({ assignment }) => {
  const requirements = assignment.requirements || DEFAULT_REQUIREMENTS;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
      <h3 className="mb-2 text-sm font-semibold text-white">Instructions</h3>
      <p className="text-sm leading-relaxed text-white/80">
        {assignment.instructions}
      </p>

      <h3 className="mb-2 mt-6 text-sm font-semibold text-white">
        Requirements
      </h3>
      <ul className="list-disc space-y-1 pl-5 text-sm text-white/70">
        {requirements.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentInstructions;