import { Link } from "react-router-dom";
import {  Home, Compass, Search } from "lucide-react";

 const NotFound = () => {


  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-6 py-16">
      
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_top,rgba(10,10,10,0.06),transparent_60%)]
          dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]
        "
      />

      <div className="relative mx-auto w-full max-w-lg text-center">
       
        <div
          
          className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
          aria-label="EJAZTECH home"
        >
          <img
            src="/logo.jpg"
            alt="EJAZTECH.AI"
            className="h-12 w-12 rounded-full object-contain"
          />
        </div>


        <p
          className="
            mt-10 text-7xl font-semibold tracking-tight text-ink
            sm:text-8xl
          "
        >
          404
        </p>

       
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Page not found
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
          The page you're looking for doesn't exist, was moved, or the link
          might be broken. Let's get you back on track.
        </p>

      
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="
              group inline-flex h-11 w-full items-center justify-center gap-2
              rounded-full bg-ink px-6
              text-sm font-medium text-canvas
              transition hover:opacity-90
              sm:w-auto
            "
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            to="/explore"
            className="
              inline-flex h-11 w-full items-center justify-center gap-2
              rounded-full border border-ink-line bg-surface
              px-6 text-sm font-medium text-ink
              transition hover:bg-ink/5
              sm:w-auto
            "
          >
            <Compass className="h-4 w-4" />
            Explore Courses
          </Link>
        </div>

       
        <div className="mt-12 border-t border-ink-line pt-6">
          <p className="text-xs text-ink-faint">
            Looking for something specific?
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 text-xs">
            <Link
              to="/help"
              className="inline-flex items-center gap-1.5 text-ink-soft transition hover:text-ink"
            >
              <Search className="h-3 w-3" />
              Help center
            </Link>
            <span className="text-ink-faint">·</span>
            <Link
              to="/contact"
              className="text-ink-soft transition hover:text-ink"
            >
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;