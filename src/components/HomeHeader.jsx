import React from 'react'

const HomeHeader = ({day, name}) => {
  return (
          <section>
        <p className="text-xs uppercase tracking-[0.2em] text-ink-faint">
          {day}, your learning space
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Welcome back, {name}
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Ready to continue where you left off?
        </p>
      </section>
  )
}

export default HomeHeader