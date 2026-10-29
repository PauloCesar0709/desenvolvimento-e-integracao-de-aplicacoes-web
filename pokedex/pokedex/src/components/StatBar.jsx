const MAX_STAT = 255

function barColor(value) {
  if (value < 50) return '#e5484d'
  if (value < 80) return '#f5a524'
  if (value < 110) return '#7ac74c'
  return '#2f9bf0'
}

export default function StatBar({ label, value }) {
  return (
    <div className="grid grid-cols-[6.5rem_2.5rem_1fr] items-center gap-2 text-sm">
      <span className="font-medium text-slate-600">{label}</span>
      <span className="font-display font-bold tabular-nums">{value}</span>
      <div
        className="h-2.5 overflow-hidden rounded-full bg-slate-300/70"
        role="meter"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={MAX_STAT}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${(value / MAX_STAT) * 100}%`, backgroundColor: barColor(value) }}
        />
      </div>
    </div>
  )
}
