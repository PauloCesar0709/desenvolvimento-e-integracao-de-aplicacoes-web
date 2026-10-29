import { TYPE_COLORS } from '../utils/pokemon'

export default function TypeBadge({ name, size = 'sm' }) {
  const pad = size === 'md' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs'
  return (
    <span
      className={`inline-block rounded-full font-display font-semibold text-white ${pad}`}
      style={{ backgroundColor: TYPE_COLORS[name] ?? TYPE_COLORS.Typeless, textShadow: '0 1px 1px rgb(0 0 0 / .35)' }}
    >
      {name}
    </span>
  )
}
