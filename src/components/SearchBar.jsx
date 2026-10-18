import { Search } from "lucide-react"

const SearchBar = ({ search, val}) => {
  return (
    <div className="relative w-full max-w-2xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint" />
          <input
            type="search"
            placeholder="Search courses or topics..."
            value={val}
            onChange={search}
            className="
              h-12 w-full rounded-full
              border border-ink-line bg-surface
              pl-12 pr-4 text-sm text-ink placeholder:text-ink-faint
              outline-none transition
              focus:border-ink/30 focus:ring-2 focus:ring-ink/5
            "
          />
        </div>
  )
}

export default SearchBar