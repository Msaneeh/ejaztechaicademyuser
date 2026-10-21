import React from "react";

const MylearningTabs = ({ Tabs, activeTab, setActiveTab, enrolledCourses }) => {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-full border border-ink-line bg-surface p-1">
      {Tabs.map((tab) => {
        const count =
          tab.id === "all"
            ? enrolledCourses.length
            : enrolledCourses.filter((c) => c.status === tab.id).length;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={[
              "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition",
              activeTab === tab.id
                ? "bg-ink text-canvas"
                : "text-ink-soft hover:bg-ink/5 hover:text-ink",
            ].join(" ")}
          >
            {tab.label}
            <span
              className={[
                "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px]",
                activeTab === tab.id
                  ? "bg-canvas/20 text-canvas"
                  : "bg-ink/5 text-ink-faint",
              ].join(" ")}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default MylearningTabs;