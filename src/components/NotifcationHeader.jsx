import { Check } from "lucide-react";

const NotifcationHeader = ({ unreadCount, markAllAsRead }) => {
  return (
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
  )
}

export default NotifcationHeader;