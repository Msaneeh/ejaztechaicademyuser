import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AlignVerticalJustifyStart, Bell, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ProfileMenu from "./ProfileMenu";
import { IconButton } from "./shared";

const navLinkClass = ({ isActive }) =>
  [
    "hidden rounded-full px-3 py-2 text-sm font-medium transition lg:inline-flex",
    isActive
      ? "text-ink"
      : "text-ink-soft hover:bg-ink/5 hover:text-ink",
  ].join(" ");

export default function DesktopActions({ user, isLoggedIn, loading, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
      
      <NavLink to="" className={navLinkClass}>
        Teach on EjazTech.AI
      </NavLink>

      {isLoggedIn && (
        <>
          <NavLink to="/my-learning" className={navLinkClass}>
            My Learning
          </NavLink>

          <IconButton to="/wishlist" label="Wishlist" desktopOnly>
            <Heart className="h-5 w-5" />
          </IconButton>

          <IconButton to="/cart" label="Cart" badge={cartCount}>
    <ShoppingCart className="h-5 w-5" />
  </IconButton>

          <IconButton to="/notifications" label="Notifications" badge={3} desktopOnly>
            <Bell className="h-5 w-5" />
          </IconButton>

          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setProfileOpen((s) => !s)}
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
              className="
                ml-1 inline-flex h-9 w-9 items-center justify-center
                overflow-hidden rounded-full
                border border-ink-line bg-surface
                transition hover:border-ink/30
              "
            >
              <img
                src={user.avatar || <AlignVerticalJustifyStart />}
                alt={user.name || "Profile"}
                className="h-full w-full object-cover"
              />
            </button>

            {profileOpen && (
              <ProfileMenu
                user={user}
                onClose={() => setProfileOpen(false)}
                onLogout={() => {
                  setProfileOpen(false);
                  onLogout();
                }}
              />
            )}
          </div>
        </>
      )}

      
      {!isLoggedIn && !loading && (
        <div className="hidden items-center gap-1 sm:gap-2 md:flex">
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              [
                "rounded-full px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "text-ink"
                  : "text-ink-soft hover:bg-ink/5 hover:text-ink",
              ].join(" ")
            }
          >
            Log in
          </NavLink>

          <NavLink
            to="/auth"
            className="
              rounded-full bg-ink px-4 py-2 text-sm font-medium
              text-canvas transition hover:opacity-90
            "
          >
            Get started
          </NavLink>
        </div>
      )}
    </div>
  );
}