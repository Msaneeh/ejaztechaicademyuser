import React from 'react'

const SettingsSidebar = ({ Tabs, activeTab, setActiveTab}) => {
  return (
    <aside className="w-full shrink-0 lg:w-64">
          <nav className="flex space-x-1 overflow-x-auto pb-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:pb-0">
            {Tabs.map((tab) => {
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
  )
}

export default SettingsSidebar