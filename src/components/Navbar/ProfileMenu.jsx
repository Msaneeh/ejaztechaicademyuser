import { Link } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";

const MenuItem = ({ to, icon: Icon, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="
      flex items-center gap-3 px-4 py-2.5
      text-sm font-medium text-ink-soft
      transition hover:bg-ink/5 hover:text-ink
    "
  >
    <Icon className="h-4 w-4" />
    {children}
  </Link>
);

export default function ProfileMenu({ user, onClose, onLogout }) {
  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40" aria-hidden="true" />

      <div
        className="
          absolute right-0 top-full z-50 mt-2 w-56
          overflow-hidden rounded-2xl border border-ink-line
          bg-surface/95 backdrop-blur-xl shadow-lg
        "
      >
        <div className="border-b border-ink-line px-4 py-3">
          <p className="truncate text-sm font-medium text-ink">
            {user.name || "Student"}
          </p>
          <p className="truncate text-xs text-ink-faint">{user.email}</p>
        </div>

        <div className="py-1">
          <MenuItem to="/profile" icon={User} onClick={onClose}>
            Profile
          </MenuItem>
          <MenuItem to="/settings" icon={Settings} onClick={onClose}>
            Settings
          </MenuItem>
        </div>

        <div className="border-t border-ink-line py-1">
          <button
            type="button"
            onClick={onLogout}
            className="
              flex w-full items-center gap-3 px-4 py-2.5
              text-sm font-medium text-ink-soft
              transition hover:bg-ink/5 hover:text-ink
            "
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </div>
    </>
  );
}