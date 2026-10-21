import React from 'react'

const NotificationTabs = ({ Tabs, setActiveTab, notifications, activeTab, unreadCount }) => {
  return (
          <section className="flex items-center border-b border-ink-line">
        {Tabs.map((tab) => {
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
  )
}

export default NotificationTabs