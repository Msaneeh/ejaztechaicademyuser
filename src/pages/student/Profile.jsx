import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Settings,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Clock,
  Edit3,
  Camera,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

/* ------------------------------------------------------------------ */
/* MOCK DATA                                                           */
/* ------------------------------------------------------------------ */
const userProfile = {
  bio: "Frontend developer passionate about building clean, accessible user interfaces. Currently mastering React and AI Engineering.",
  location: "Lagos, Nigeria",
  joinedDate: "Joined August 2024",
  interests: ["Frontend", "AI", "UI/UX Design"],
};

const certificates = [
  {
    id: "cert-html",
    course: "HTML & CSS Essentials",
    date: "Oct 12, 2024",
    code: "EJZ-HTML-901",
  },
  {
    id: "cert-js",
    course: "JavaScript Basics",
    date: "Aug 28, 2024",
    code: "EJZ-JS-442",
  },
];

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      {/* ---------------- Header / Cover ---------------- */}
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
                onClick={() => setIsEditing(!isEditing)}
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

      {/* ---------------- Stats Grid ---------------- */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={BookOpen} label="Enrolled Courses" value="4" />
        <StatCard icon={Clock} label="Hours Learned" value="24.5" />
        <StatCard icon={Award} label="Certificates" value={certificates.length.toString()} />
        <StatCard icon={Edit3} label="Assignments" value="12" />
      </section>

      {/* ---------------- Certificates ---------------- */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight text-ink">
            Earned Certificates
          </h2>
        </div>
        
        {certificates.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="
                  flex items-start gap-4 rounded-2xl border border-ink-line
                  bg-surface p-5 transition hover:border-ink/20
                "
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink">{cert.course}</h3>
                  <p className="mt-1 text-xs text-ink-soft">Issued: {cert.date}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-ink-faint">
                    ID: {cert.code}
                  </p>
                  <Link
                    to={`/verify/${cert.code}`}
                    className="mt-3 inline-block text-xs font-medium text-ink hover:underline"
                  >
                    View Certificate →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-soft">No certificates earned yet. Keep learning!</p>
        )}
      </section>

      {/* ---------------- Edit Profile Modal (Placeholder for later) ---------------- */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-ink-line bg-surface p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-ink">Edit Profile</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Profile editing form will go here (using React Hook Form + Zod).
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft hover:bg-ink/5"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-canvas"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stat Card Component                                                 */
/* ------------------------------------------------------------------ */
function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col rounded-2xl border border-ink-line bg-surface p-5">
      <div className="flex items-center gap-2 text-ink-faint">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}