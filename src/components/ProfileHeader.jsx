import {
  Settings,
  Mail,
  MapPin,
  Calendar,
  Camera,
  Edit3,
} from "lucide-react";

import { Link } from "react-router-dom";

const ProfileHeader = ({ user, editHandler, userProfile }) => {
  return (
          <section className="overflow-hidden rounded-3xl border border-ink-line bg-surface">
        {/* Cover Image Placeholder */}
        <div className="h-32 w-full bg-ink/5 sm:h-48 relative">
          {/* Subtle pattern or image can go here */}
        </div>

        <div className="px-6 pb-8 sm:px-10">
          {/* Avatar & Actions */}
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between -mt-12 sm:-mt-16">
            <div className="relative inline-flex">
              <img
                src={user?.avatar || "/logo.jpg"}
                alt={user?.name || "Profile"}
                className="h-24 w-24 rounded-full border-4 border-surface bg-canvas object-cover sm:h-32 sm:w-32"
              />
              <button className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border border-ink-line bg-surface text-ink-soft shadow-sm transition hover:bg-ink/5 hover:text-ink">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={editHandler}
                className="
                  inline-flex h-10 items-center gap-2 rounded-full border border-ink-line
                  bg-surface px-5 text-sm font-medium text-ink transition hover:bg-ink/5
                "
              >
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </button>
              <Link
                to="/settings"
                className="
                  inline-flex h-10 items-center justify-center rounded-full
                  bg-ink px-5 text-sm font-medium text-canvas transition hover:opacity-90
                "
              >
                <Settings className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6">
            <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {user?.name || "Student Name"}
            </h1>
            <p className="text-sm text-ink-soft">{user?.email || "student@ejaztech.ai"}</p>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
            {userProfile.bio}
          </p>

          {/* Meta tags */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-faint">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {userProfile.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {userProfile.joinedDate}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {user?.email}
            </span>
          </div>

          {/* Interests */}
          <div className="mt-6 flex flex-wrap gap-2">
            {userProfile.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink-soft"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </section>
  )
}

export default ProfileHeader;