import { NavLink } from "react-router-dom";

/**
 * Circular icon button used on desktop (cart, bell, wishlist).
 * Visibility handled via `desktopOnly` prop instead of className merge.
 */
export const IconButton = ({ to, label, badge, desktopOnly = false, children }) => (
  <NavLink
    to={to}
    aria-label={label}
    className={({ isActive }) =>
      [
        "relative h-9 w-9 items-center justify-center rounded-full transition",
        desktopOnly ? "hidden md:inline-flex" : "inline-flex",
        isActive
          ? "bg-ink/5 text-ink"
          : "text-ink-soft hover:bg-ink/5 hover:text-ink",
      ].join(" ")
    }
  >
    {children}
    {badge ? (
      <span
        className="
          absolute -right-0.5 -top-0.5
          flex h-4 min-w-4 items-center justify-center
          rounded-full bg-ink px-1
          text-[10px] font-semibold leading-none text-canvas
        "
      >
        {badge > 9 ? "9+" : badge}
      </span>
    ) : null}
  </NavLink>
);


export const DrawerLink = ({ to, icon: Icon, onClick, badge, children }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      [
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
        isActive
          ? "bg-ink text-canvas"
          : "text-ink-soft hover:bg-ink/5 hover:text-ink",
      ].join(" ")
    }
  >
    <Icon className="h-4 w-4" />
    <span className="flex-1">{children}</span>
    {badge ? (
      <span
        className="
          flex h-5 min-w-5 items-center justify-center
          rounded-full bg-ink px-1.5
          text-[10px] font-semibold text-canvas
        "
      >
        {badge > 9 ? "9+" : badge}
      </span>
    ) : null}
  </NavLink>
);