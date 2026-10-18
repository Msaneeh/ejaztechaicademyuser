import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Bot,
  CheckCircle2,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/context/ThemeContext";

const TABS = [
  { id: "account", label: "Account", icon: User },
  { id: "appearance", label: "Appearance", icon: Sun },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "ai", label: "AI Preferences", icon: Bot },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      {/* ---------------- Header ---------------- */}
      <section>
        <Link
          to="/profile"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Manage your account preferences and security.
        </p>
      </section>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* ---------------- Sidebar Navigation ---------------- */}
        <aside className="w-full shrink-0 lg:w-64">
          <nav className="flex space-x-1 overflow-x-auto pb-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:pb-0">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-ink text-canvas"
                      : "text-ink-soft hover:bg-ink/5 hover:text-ink",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ---------------- Content Area ---------------- */}
        <div className="flex-1 rounded-2xl border border-ink-line bg-surface p-6 sm:p-8">
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "ai" && <AISettings />}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tab 1: Account Settings                                             */
/* ------------------------------------------------------------------ */
function AccountSettings() {
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
  );
}

/* ------------------------------------------------------------------ */
/* Tab 2: Appearance Settings (Theme)                                  */
/* ------------------------------------------------------------------ */
function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-ink">Appearance</h2>
        <p className="text-sm text-ink-soft">Customize how EJAZTECH.AI looks on your device.</p>
      </div>

      <div className="space-y-4 border-t border-ink-line pt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          
          {/* Light Mode Card */}
          <button
            onClick={() => setTheme("light")}
            className={[
              "flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all",
              theme === "light"
                ? "border-ink bg-ink/5"
                : "border-ink-line hover:border-ink/30",
            ].join(" ")}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface shadow-sm border border-ink-line">
              <Sun className="h-6 w-6 text-ink" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-ink">Light</p>
              <p className="text-xs text-ink-faint">Bright and clean</p>
            </div>
          </button>

          {/* Dark Mode Card */}
          <button
            onClick={() => setTheme("dark")}
            className={[
              "flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all",
              theme === "dark"
                ? "border-ink bg-ink/5"
                : "border-ink-line hover:border-ink/30",
            ].join(" ")}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A0A0A] shadow-sm border border-[#222]">
              <Moon className="h-6 w-6 text-[#FAF8F5]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-ink">Dark</p>
              <p className="text-xs text-ink-faint">Easy on the eyes</p>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tab 3: Notification Settings                                        */
/* ------------------------------------------------------------------ */
function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-ink">Notifications</h2>
        <p className="text-sm text-ink-soft">Choose what updates you want to receive.</p>
      </div>

      <div className="space-y-4 border-t border-ink-line pt-6">
        <ToggleRow
          title="Course updates"
          description="When a mentor adds a new lesson or module to a course you're enrolled in."
          defaultChecked
        />
        <ToggleRow
          title="Deadline reminders"
          description="Get notified 24 hours before an assignment or quiz is due."
          defaultChecked
        />
        <ToggleRow
          title="Platform announcements"
          description="News about new features, cohorts, and platform updates."
        />
        <ToggleRow
          title="Promotional emails"
          description="Occasional offers and course recommendations."
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tab 4: Security Settings                                            */
/* ------------------------------------------------------------------ */
function SecuritySettings() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-ink">Security</h2>
        <p className="text-sm text-ink-soft">Manage your password and active sessions.</p>
      </div>

      {/* Change Password */}
      <div className="space-y-4 border-t border-ink-line pt-6">
        <h3 className="text-sm font-medium text-ink">Change Password</h3>
        <div className="max-w-sm space-y-3">
          <input
            type="password"
            placeholder="Current password"
            className="h-10 w-full rounded-xl border border-ink-line bg-background px-4 text-sm text-ink outline-none"
          />
          <input
            type="password"
            placeholder="New password"
            className="h-10 w-full rounded-xl border border-ink-line bg-background px-4 text-sm text-ink outline-none"
          />
          <button className="rounded-full border border-ink-line bg-surface px-4 py-2 text-sm font-medium text-ink hover:bg-ink/5">
            Update Password
          </button>
        </div>
      </div>

      {/* Sessions */}
      <div className="space-y-4 border-t border-ink-line pt-6">
        <h3 className="text-sm font-medium text-ink">Active Sessions</h3>
        <div className="flex items-center justify-between rounded-xl border border-ink-line p-4">
          <div>
            <p className="text-sm font-medium text-ink">Current Device</p>
            <p className="text-xs text-ink-faint">MacBook Pro · Lagos, Nigeria · Active now</p>
          </div>
          <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-[10px] font-medium text-green-600 dark:text-green-400">
            This device
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tab 5: AI Preferences                                               */
/* ------------------------------------------------------------------ */
function AISettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-ink">AI Preferences</h2>
        <p className="text-sm text-ink-soft">Customize your AI learning assistant.</p>
      </div>

      <div className="space-y-4 border-t border-ink-line pt-6">
        <ToggleRow
          title="Context awareness"
          description="Allow the AI to read the current lesson so it can give relevant answers."
          defaultChecked
        />
        <ToggleRow
          title="Save conversation history"
          description="Keep a history of your AI chats so you can review past explanations."
          defaultChecked
        />
        
        <div className="pt-4">
          <label className="mb-1.5 block text-xs font-medium text-ink">AI Tone</label>
          <select className="h-10 w-full max-w-xs rounded-xl border border-ink-line bg-background px-3 text-sm text-ink outline-none">
            <option>Encouraging & Mentor-like</option>
            <option>Direct & Technical</option>
            <option>Simple & ELI5 (Explain Like I'm 5)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared UI Components                                                */
/* ------------------------------------------------------------------ */
function ToggleRow({ title, description, defaultChecked = false }) {
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