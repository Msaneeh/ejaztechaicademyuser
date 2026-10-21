import { useState } from "react";

const ToggleRow = ({ title, description, defaultChecked = false }) => {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-ink">{title}</p>
        <p className="text-xs text-ink-soft mt-0.5 max-w-md">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={[
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors mt-0.5",
          enabled ? "bg-ink" : "bg-ink/20",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-4 w-4 rounded-full bg-surface transition-transform",
            enabled ? "translate-x-4" : "translate-x-0.5",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

export default ToggleRow;