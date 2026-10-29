import { TYPE_COLORS } from '../utils/pokemon'

export default function TypeFilter({ types, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
      <button
        type="button"
        onClick={() => onChange('')}
        aria-pressed={active === ''}
        className={`rounded-full border-2 px-3 py-1 font-display text-sm font-semibold transition-colors ${
          active === '' ? 'border-white bg-white text-dex-shell' : 'border-white/20 text-white/80 hover:border-white/60'
        }`}
      >
        Todos
      </button>
      {types.map((type) => {
        const selected = active === type
        return (
          <button
            key={type}
            type="button"
            onClick={() => onChange(selected ? '' : type)}
            aria-pressed={selected}
            className="rounded-full border-2 px-3 py-1 font-display text-sm font-semibold transition-colors"
            style={{
              borderColor: TYPE_COLORS[type],
              backgroundColor: selected ? TYPE_COLORS[type] : 'transparent',
              color: selected ? '#fff' : TYPE_COLORS[type],
            }}
          >
            {type}
          </button>
        )
      })}
    </div>
  )
}
