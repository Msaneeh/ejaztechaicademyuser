import { Link } from "react-router-dom";
import {
  BookOpen,
  Award,
  MessageSquare,
  Bell,
} from "lucide-react";

const NotificationItem = ({ notification, onMarkRead }) => {
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
      
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg} ${color}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      
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

export default NotificationItem;