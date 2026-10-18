import React from 'react'

const SectionLabel = ({ children }) => {
  return (
    <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-ink-faint">
      {children}
    </h2>
  );
}

export default SectionLabel