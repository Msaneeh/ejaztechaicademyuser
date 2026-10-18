import { SlidersHorizontal } from "lucide-react";

const ExploreFilters = ({ categ, activeCat, activeDif, setActiDif, diffu}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
          {categ.map((cat) => (
            <button
              key={cat}
              onClick={activeCat}
              className={[
                "rounded-full border px-4 py-1.5 text-xs font-medium transition",
                activeCat === cat
                  ? "border-ink bg-ink text-canvas"
                  : "border-ink-line bg-surface text-ink-soft hover:bg-ink/5 hover:text-ink",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}

          <div className="h-4 w-px bg-ink-line mx-1" />

          {/* Difficulty Filter (Dropdown style) */}
          <div className="relative flex items-center">
            <SlidersHorizontal className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-ink-faint" />
            <select
              value={activeDif}
              onChange={setActiDif}
              className="
                appearance-none rounded-full border border-ink-line bg-surface
                py-1.5 pl-9 pr-8 text-xs font-medium text-ink
                outline-none transition cursor-pointer hover:bg-ink/5
                focus:border-ink/30 focus:ring-2 focus:ring-ink/5
              "
            >
              {diffu.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow for select */}
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-faint"/>
              </svg>
            </div>
          </div>
        </div>
  )
}

export default ExploreFilters;