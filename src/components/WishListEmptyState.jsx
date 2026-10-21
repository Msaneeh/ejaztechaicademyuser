import { Link } from "react-router-dom"
import { Heart } from "lucide-react"

const WishListEmptyState = () => {
  return (
     <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-line py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ink/5">
              <Heart className="h-8 w-8 text-ink-faint" />
            </div>
            <h3 className="text-lg font-semibold text-ink">Your wishlist is empty</h3>
            <p className="mt-2 max-w-sm text-sm text-ink-soft">
              Save courses you're interested in, and they'll appear here for easy access.
            </p>
            <Link
              to="/explore"
              className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-canvas transition hover:opacity-90"
            >
              Explore Courses
            </Link>
          </div>
  )
}

export default WishListEmptyState