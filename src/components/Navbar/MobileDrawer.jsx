import { Link, NavLink } from "react-router-dom";
import {
  BookOpen,
  ChevronRight,
  Compass,
  GraduationCap,
  LogIn,
  LogOut,
  X,
} from "lucide-react";
import { DrawerLink } from "./shared";

export default function MobileDrawer({
  open,
  onClose,
  isLoggedIn,
  user,
  onLogout,
}) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw]",
          "border-r border-ink-line bg-canvas",
          "transform transition-transform duration-200 md:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-hidden={!open}
      >
        
        <div className="border-b border-ink-line">
          {isLoggedIn ? <UserChip user={user} onClose={onClose} /> : <BrandHeader onClose={onClose} />}
        </div>

        
        <nav className="flex flex-col gap-1 p-3">
          <DrawerLink to="/explore" icon={Compass} onClick={onClose}>
            Explore Courses
          </DrawerLink>

          {isLoggedIn && (
            <DrawerLink to="/my-learning" icon={GraduationCap} onClick={onClose}>
              My Learning
            </DrawerLink>
          )}

          <DrawerLink to="/teach" icon={BookOpen} onClick={onClose}>
            Teach on EjazTech.AI
          </DrawerLink>
        </nav>

      
        <div className="absolute bottom-4 left-3 right-3">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={onLogout}
              className="
                flex w-full items-center justify-center gap-2 rounded-full
                border border-ink-line bg-surface px-4 py-2.5
                text-sm font-medium text-ink
                transition hover:bg-ink/5
              "
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          ) : (
            <div className="space-y-2">
              <NavLink
                to="/auth"
                onClick={onClose}
                className="
                  flex w-full items-center justify-center gap-2 rounded-full
                  border border-ink-line bg-surface px-4 py-2.5
                  text-sm font-medium text-ink
                  transition hover:bg-ink/5
                "
              >
                <LogIn className="h-4 w-4" />
                Log in
              </NavLink>

              <NavLink
                to="/auth"
                onClick={onClose}
                className="
                  flex w-full items-center justify-center rounded-full
                  bg-ink px-4 py-2.5
                  text-sm font-medium text-canvas
                  transition hover:opacity-90
                "
              >
                Get started
              </NavLink>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-blocks                                                          */
/* ------------------------------------------------------------------ */

function BrandHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <Link
        to="/"
        onClick={onClose}
        className="flex items-center gap-2"
        aria-label="EJAZTECH home"
      >
        <img
          src="/logo.jpg"
          alt="EJAZTECH.AI"
          className="h-10 w-10 rounded-full object-contain"
        />
        <span className="text-sm font-semibold tracking-tight text-ink">
          EJAZTECH.AI
        </span>
      </Link>

      <CloseButton onClose={onClose} />
    </div>
  );
}

function UserChip({ user, onClose }) {
  return (
    <div className="flex items-center gap-2 px-3 py-3">
      <Link
        to="/profile"
        onClick={onClose}
        className="
          group flex min-w-0 flex-1 items-center gap-3
          rounded-xl px-2 py-2 transition hover:bg-ink/5
        "
      >
        <img
          src={user?.avatar || "/logo.jpg"}
          alt={user?.name || "Profile"}
          className="h-11 w-11 shrink-0 rounded-full border border-ink-line object-cover"
        />
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm font-semibold text-ink">
            {user?.name || "Student"}
          </p>
          <p className="truncate text-xs text-ink-faint">{user?.email}</p>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
      </Link>

      <CloseButton onClose={onClose} />
    </div>
  );
}

function CloseButton({ onClose }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close menu"
      className="
        inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full
        text-ink-soft transition hover:bg-ink/5 hover:text-ink
      "
    >
      <X className="h-5 w-5" />
    </button>
  );
}