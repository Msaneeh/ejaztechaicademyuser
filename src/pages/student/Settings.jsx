import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Bot,
  Sun,
} from "lucide-react";

import SettingsSidebar from "@/components/SettingsSidebar";
import AccountSettings from "@/components/AccountSettings";
import AppearanceSettings from "@/components/AppearanceSettings";
import NotificationSettings from "@/components/NotificationSettings";
import SecuritySettings from "@/components/SecuritySettings";




const TABS = [
  { id: "account", label: "Account", icon: User },
  { id: "appearance", label: "Appearance", icon: Sun },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
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
        <SettingsSidebar 
          Tabs={TABS} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          />

        {/* ---------------- Content Area ---------------- */}
        <div className="flex-1 rounded-2xl border border-ink-line bg-surface p-6 sm:p-8">
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "security" && <SecuritySettings />}

        </div>
      </div>
    </div>
  );
}
