import React from 'react'

const ProfileStatCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex flex-col rounded-2xl border border-ink-line bg-surface p-5">
      <div className="flex items-center gap-2 text-ink-faint">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-ink">{value}</p>
    </div>
  )
}

export default ProfileStatCard