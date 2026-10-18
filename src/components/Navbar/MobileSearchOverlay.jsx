import { Search, X } from "lucide-react";

export default function MobileSearchOverlay({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-canvas md:hidden">
      <div className="flex h-16 items-center gap-3 border-b border-ink-line px-4">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            autoFocus
            type="search"
            placeholder="Search for courses, mentors, topics…"
            className="
              h-10 w-full rounded-full
              border border-ink-line bg-surface
              pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint
              outline-none transition
              focus:border-ink/30 focus:ring-2 focus:ring-ink/5
            "
          />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="
            inline-flex h-9 w-9 items-center justify-center rounded-full
            text-ink-soft transition hover:bg-ink/5 hover:text-ink
          "
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-faint">
          Popular searches
        </p>
        <ul className="mt-3 space-y-2 text-sm text-ink-soft">
          {["React", "Python", "AI Engineering", "Data Science"].map((term) => (
            <li key={term}>
              <button
                type="button"
                onClick={onClose}
                className="transition hover:text-ink"
              >
                {term}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}