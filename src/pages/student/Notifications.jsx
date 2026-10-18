import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  BookOpen,
  Award,
  MessageSquare,
  CheckCircle2,
  Check,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* MOCK DATA                                                           */
/* ------------------------------------------------------------------ */
const initialNotifications = [
  {
    id: "n1",
    type: "course",
    title: "New lesson added",
    message: "Eng. Ejaz just added 'React Performance Optimization' to React Fundamentals.",
    time: "2 hours ago",
    read: false,
    link: "/learn/react-fundamentals",
  },
  {
    id: "n2",
    type: "certificate",
    title: "Certificate Earned",
    message: "Congratulations! You've completed HTML & CSS Essentials and earned your certificate.",
    time: "1 day ago",
    read: false,
    link: "/certificates",
  },
  {
    id: "n3",
    type: "message",
    title: "New reply from mentor",
    message: "Eng. Yusuf replied to your question in the AI Engineering discussion.",
    time: "2 days ago",
    read: true,
    link: "/learn/ai-engineering",
  },
  {
    id: "n4",
    type: "system",
    title: "Welcome to EJAZTECH.AI",
    message: "Thanks for joining! Start exploring courses to build your skills.",
    time: "1 week ago",
    read: true,
    link: "/explore",
  },
];

const TABS = [
  { id: "all", label: "All notifications" },
  { id: "unread", label: "Unread" },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Filter based on tab
  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "unread") return !n.read;
    return true;
  });

  // Mark single as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-12">
      {/* ---------------- Header ---------------- */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            You have {unreadCount} unread {unreadCount === 1 ? "message" : "messages"}.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="
              inline-flex items-center gap-2 rounded-full border border-ink-line
              bg-surface px-4 py-2 text-xs font-medium text-ink
              transition hover:bg-ink/5
            "
          >
            <Check className="h-3.5 w-3.5" />
            Mark all as read
          </button>
        )}
      </section>

      {/* ---------------- Tabs ---------------- */}
      <section className="flex items-center border-b border-ink-line">
        {TABS.map((tab) => {
          const count =
            tab.id === "all" ? notifications.length : unreadCount;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                "relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition",
                activeTab === tab.id
                  ? "text-ink"
                  : "text-ink-soft hover:text-ink",
              ].join(" ")}
            >
              {tab.label}
              <span
                className={[
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px]",
                  activeTab === tab.id
                    ? "bg-ink text-canvas"
                    : "bg-ink/5 text-ink-faint",
                ].join(" ")}
              >
                {count}
              </span>

              {/* Active Underline */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink" />
              )}
            </button>
          );
        })}
      </section>

      {/* ---------------- List ---------------- */}
      <section>
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-line py-20 text-center">
            <Bell className="mb-4 h-10 w-10 text-ink-faint/50" />
            <h3 className="text-base font-semibold text-ink">No notifications</h3>
            <p className="mt-1 text-sm text-ink-soft">
              {activeTab === "unread"
                ? "You're all caught up! No unread messages."
                : "You don't have any notifications yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={() => markAsRead(notification.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Item Component                                                      */
/* ------------------------------------------------------------------ */
function NotificationItem({ notification, onMarkRead }) {
  const isUnread = !notification.read;

  // Map type to specific icon and styling
  const getIconData = (type) => {
    switch (type) {
      case "course":
        return { icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" };
      case "certificate":
        return { icon: Award, color: "text-amber-600", bg: "bg-amber-50" };
      case "message":
        return { icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" };
      default:
        return { icon: Bell, color: "text-ink-soft", bg: "bg-ink/5" };
    }
  };

  const { icon: Icon, color, bg } = getIconData(notification.type);

  return (
    <div
      className={[
        "group relative flex items-start gap-4 rounded-2xl border p-4 transition sm:items-center",
        isUnread
          ? "border-ink/15 bg-ink/[0.02]"
          : "border-ink-line bg-surface hover:bg-ink/[0.02]",
      ].join(" ")}
    >
      {/* Icon */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg} ${color}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4 sm:items-center">
          <h3
            className={[
              "text-sm font-medium",
              isUnread ? "text-ink" : "text-ink-soft",
            ].join(" ")}
          >
            {notification.title}
          </h3>
          <span className="shrink-0 text-xs text-ink-faint">
            {notification.time}
          </span>
        </div>
        <p className="mt-1 text-sm text-ink-soft line-clamp-2">
          {notification.message}
        </p>
        
        {/* Action Link */}
        <div className="mt-3 flex items-center gap-4">
          <Link
            to={notification.link}
            onClick={onMarkRead}
            className="text-xs font-semibold text-ink hover:underline"
          >
            View details
          </Link>
          
          {isUnread && (
            <button
              onClick={onMarkRead}
              className="text-xs font-medium text-ink-soft hover:text-ink"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>

      {/* Unread Indicator Dot */}
      {isUnread && (
        <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-blue-600 sm:top-1/2 sm:-translate-y-1/2" />
      )}
    </div>
  );
}