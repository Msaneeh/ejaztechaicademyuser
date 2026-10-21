import React, { useState } from 'react'
import { useAuth } from "@/hooks/useAuth";

import { CheckCircle2 } from 'lucide-react';

const AccountSettings = () => {
      const { user } = useAuth();
      const [saved, setSaved] = useState(false);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: POST /api/users/profile
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      };
  return (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-ink">Account Information</h2>
            <p className="text-sm text-ink-soft">Update your basic profile details.</p>
          </div>
    
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name || "Student Name"}
                  className="h-10 w-full rounded-xl border border-ink-line bg-background px-4 text-sm text-ink outline-none focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink">Email Address</label>
                <input
                  type="email"
                  defaultValue={user?.email || "student@ejaztech.ai"}
                  className="h-10 w-full rounded-xl border border-ink-line bg-background px-4 text-sm text-ink outline-none focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
                />
              </div>
            </div>
    
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">Bio</label>
              <textarea
                rows={3}
                defaultValue="Frontend developer passionate about building clean, accessible user interfaces."
                className="w-full resize-none rounded-xl border border-ink-line bg-background p-4 text-sm text-ink outline-none focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
              />
            </div>
    
            <div className="flex items-center justify-between border-t border-ink-line pt-6">
              {saved ? (
                <span className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4" /> Changes saved
                </span>
              ) : (
                <span />
              )}
              <button
                type="submit"
                className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-canvas transition hover:opacity-90"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
 
  )
}

export default AccountSettings