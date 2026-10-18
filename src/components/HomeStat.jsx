

const HomeStat = ({ sta }) => {

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {sta.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-ink-line bg-surface p-5 transition hover:border-ink/20"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">
                {label}
              </p>
              <Icon className="h-4 w-4 text-ink-faint" />
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-ink">
              {value}
            </p>
          </div>
        ))}
      </section>
  )
}

export default HomeStat