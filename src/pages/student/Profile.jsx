import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

import { userProfile, certificates } from "@/mockData/profileData";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileStats from "@/components/ProfileStats";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const editHandler = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      {/* ---------------- Header / Cover ---------------- */}
      <ProfileHeader 
      user={user} 
      editHandler={editHandler}
      userProfile={userProfile}
      />

      {/* ---------------- Stats Grid ---------------- */}
      <ProfileStats certificates={certificates} />

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



export default Profile;