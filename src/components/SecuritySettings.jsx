const SecuritySettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-ink">Security</h2>
        <p className="text-sm text-ink-soft">Manage your password and active sessions.</p>
      </div>

      {/* Change Password */}
      <div className="space-y-4 border-t border-ink-line pt-6">
        <h3 className="text-sm font-medium text-ink">Change Password</h3>
        <div className="max-w-sm space-y-3">
          <input
            type="password"
            placeholder="Current password"
            className="h-10 w-full rounded-xl border border-ink-line bg-background px-4 text-sm text-ink outline-none"
          />
          <input
            type="password"
            placeholder="New password"
            className="h-10 w-full rounded-xl border border-ink-line bg-background px-4 text-sm text-ink outline-none"
          />
          <button className="rounded-full border border-ink-line bg-surface px-4 py-2 text-sm font-medium text-ink hover:bg-ink/5">
            Update Password
          </button>
        </div>
      </div>

      {/* Sessions */}
      <div className="space-y-4 border-t border-ink-line pt-6">
        <h3 className="text-sm font-medium text-ink">Active Sessions</h3>
        <div className="flex items-center justify-between rounded-xl border border-ink-line p-4">
          <div>
            <p className="text-sm font-medium text-ink">Current Device</p>
            <p className="text-xs text-ink-faint">MacBook Pro · Lagos, Nigeria · Active now</p>
          </div>
          <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-[10px] font-medium text-green-600 dark:text-green-400">
            This device
          </span>
        </div>
      </div>
    </div>
  );
}

export default SecuritySettings;