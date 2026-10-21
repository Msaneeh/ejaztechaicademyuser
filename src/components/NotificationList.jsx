import NotificationItem from "./NotificationItem"

const NotificationList = ({ filteredNotifications, activeTab }) => {
  return (
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
  )
}

export default NotificationList