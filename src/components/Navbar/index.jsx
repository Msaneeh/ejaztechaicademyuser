// src/components/Navbar/index.jsx
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/context/CartContext";

import DesktopActions from "./DesktopActions";
import MobileDrawer from "./MobileDrawer";
import MobileSearchOverlay from "./MobileSearchOverlay";


const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const isLoggedIn = !!user;
  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    
  }

  return (
    <>
      <header
        className="
          sticky top-0 z-50 w-full
          border-b border-ink-line
          bg-canvas/80 backdrop-blur-xl
        "
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          <div className="flex w-full items-center justify-between md:hidden">
         
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition hover:bg-ink/5 hover:text-ink"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link
              to="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
              aria-label="EJAZTECH home"
            >
              <img
                src="/logo.jpg"
                alt="EJAZTECH.AI"
                className="h-8 w-8 rounded-full object-contain"
              />
              <span className="text-sm font-semibold tracking-tight text-ink">
                EJAZTECH.AI
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-ink/5 hover:text-ink"
              >
                <Search className="h-5 w-5" />
              </button>
              
              {isLoggedIn && (
  <Link
    to="/cart"
    className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-ink/5 hover:text-ink"
  >
    <ShoppingCart className="h-5 w-5" />
    {cartCount > 0 && (
      <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold leading-none text-canvas">
        {cartCount > 9 ? "9+" : cartCount}
      </span>
    )}
  </Link>
)}

            </div>
          </div>

          <div className="hidden w-full items-center gap-6 md:flex">
            
            <div
              
              className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
              aria-label="EJAZTECH home"
            >
              <img
                src="/logo.jpg"
                alt="EJAZTECH.AI"
                className="h-11 w-11 rounded-full object-contain"
              />
              <span className="text-sm font-semibold tracking-tight text-ink">
                EJAZTECH.AI
              </span>
            </div>

            
            <div className="flex flex-1 items-center justify-center gap-3">
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  [
                    "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "text-ink"
                      : "text-ink-soft hover:bg-ink/5 hover:text-ink",
                  ].join(" ")
                }
              >
                Explore
              </NavLink>

              <div className="relative w-full max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                <input
                  type="search"
                  placeholder="Search for courses, mentors, topics…"
                  className="
                    h-10 w-full rounded-full
                    border border-ink-line bg-surface
                    pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint
                    outline-none transition
                    focus:border-ink/30 focus:ring-2 focus:ring-ink/5
                  "
                />
              </div>
            </div>

            <DesktopActions
              user={user}
              isLoggedIn={isLoggedIn}
              loading={loading}
              onLogout={handleLogout}
            />
          </div>
        </nav>
      </header>

      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />

      <MobileSearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}


export default Navbar;