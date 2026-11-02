export default function TrustStrip() {
  const brands = ["Vercel", "Neon", "Cloudinary", "Render", "GitHub"];

  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Built with and trusted by teams using
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {brands.map((brand) => (
              <li
                key={brand}
                className="
                  text-sm font-medium tracking-tight text-muted-foreground
                  transition-colors hover:text-foreground
                "
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}