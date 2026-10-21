import { useState } from "react";

import initialNotifications from "@/mockData/notificationData";
import NotifcationHeader from "@/components/NotifcationHeader";
import NotificationTabs from "@/components/NotificationTabs";
import NotificationList from "@/components/NotificationList";

const TABS = [
  { id: "all", label: "All notifications" },
  { id: "unread", label: "Unread" },
];

const Notifications = () => {
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
      <NotifcationHeader unreadCount={unreadCount} markAllAsRead={markAllAsRead} />

      {/* ---------------- Tabs ---------------- */}
      <NotificationTabs 
      Tabs={TABS} 
      setActiveTab={setActiveTab} 
      notifications={notifications}
      activeTab={activeTab}
      unreadCount={unreadCount}
      />

      {/* ---------------- List ---------------- */}
      <NotificationList filteredNotifications={filteredNotifications} activeTab={activeTab} />
    </div>
  );
}

export default Notifications;