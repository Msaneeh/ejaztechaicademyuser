import ToggleRow from "./ToggleRow";
const NotificationSettings = () => {
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

export default NotificationSettings;