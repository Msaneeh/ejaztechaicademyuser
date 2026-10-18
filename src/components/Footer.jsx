import { Link } from "react-router-dom";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Courses", to: "/courses" },
      { label: "Mentors", to: "/mentors" },
      { label: "Pricing", to: "/pricing" },
      { label: "Teach on EjazTech.AI", to: "/teach" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
      { label: "Blog", to: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", to: "/terms" },
      { label: "Privacy", to: "/privacy" },
      { label: "Cookies", to: "/cookies" },
      { label: "Verify a certificate", to: "/verify" },
    ],
  },
];

const socials = [
  { label: "Twitter / X", to: "https://twitter.com", Icon: TwitterIcon },
  { label: "GitHub",      to: "https://github.com",  Icon: GithubIcon  },
  { label: "LinkedIn",    to: "https://linkedin.com", Icon: LinkedinIcon },
  { label: "YouTube",     to: "https://youtube.com",  Icon: YoutubeIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Top: brand + columns */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <Link
              to="/"
              className="inline-flex items-center transition-opacity hover:opacity-80"
              aria-label="EJAZTECH home"
            >
              <img
                src="/logo.jpg"
                alt="EJAZTECH.AI"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A learning platform for builders. Mentor-led courses, lesson-level
              progress, an AI assistant that actually knows your lesson, and
              certificates when you finish.
            </p>

            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Automate · Innovate · Educate
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="
                          text-sm text-foreground/80
                          transition hover:text-foreground
                        "
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: legal + socials */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} EJAZTECH.AI · All rights reserved.
          </p>

          <ul className="flex items-center gap-2">
            {socials.map(({ label, to, Icon }) => (
              <li key={label}>
                <a
                  href={to}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="
                    inline-flex h-9 w-9 items-center justify-center rounded-full
                    border border-border bg-background text-muted-foreground
                    transition
                    hover:border-foreground/30 hover:text-foreground
                  "
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Inline social icons — self-contained, no library dependency         */
/* ------------------------------------------------------------------ */

function TwitterIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function GithubIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.95 3.21 9.14 7.67 10.62.56.1.77-.24.77-.54v-1.9c-3.12.68-3.78-1.5-3.78-1.5-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 .1 1.56-.73 1.94-1.06.06-.7.4-1.17.72-1.44-2.49-.28-5.11-1.25-5.11-5.55 0-1.23.44-2.23 1.16-3.01-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3.01 0 4.31-2.62 5.27-5.12 5.54.41.36.78 1.06.78 2.14v3.17c0 .3.2.65.78.54 4.45-1.49 7.66-5.67 7.66-10.62C23.25 5.48 18.27.5 12 .5Z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.554V9h3.565v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

function YoutubeIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
    </svg>
  );
}