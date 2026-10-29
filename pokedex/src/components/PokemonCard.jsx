import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'
import { STAT_LABELS, TYPE_COLORS, pad } from '../utils/pokemon'

export default function PokemonCard({ pokemon, isFavorite, onSelect, onToggleFavorite }) {
  const color = TYPE_COLORS[pokemon.types[0]?.name] ?? TYPE_COLORS.Typeless

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-dex-screen text-slate-900 shadow-md transition-transform hover:-translate-y-1">
      <div
        className="flex flex-col items-center px-3 pt-3"
        style={{ background: `radial-gradient(circle at 50% 55%, ${color}55, transparent 70%)` }}
      >
        <span className="self-start font-display text-sm font-bold text-slate-500">#{pad(pokemon.id)}</span>
        <PokemonImage id={pokemon.id} name={pokemon.name} className="size-32" />
      </div>

      <div className="px-3 pb-3 pt-2">
        <h2 className="font-display text-xl font-bold leading-tight">
          <button
            type="button"
            onClick={() => onSelect(pokemon.id)}
            className="text-left after:absolute after:inset-0 after:content-['']"
            aria-label={`Ver detalhes de ${pokemon.name}`}
          >
            {pokemon.name}
          </button>
        </h2>
        <div className="mt-1 flex flex-wrap gap-1">
          {pokemon.types.map((t) => <TypeBadge key={t.id} name={t.name} />)}
        </div>

        <dl className="mt-3 grid grid-cols-3 gap-1 text-center">
          {STAT_LABELS.map((s) => (
            <div key={s.key} className="rounded-md bg-slate-900/5 py-1">
              <dt className="text-[0.65rem] font-semibold text-slate-500">{s.short}</dt>
              <dd className="font-display text-sm font-bold tabular-nums">{pokemon.stats[s.key]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <button
        type="button"
        onClick={() => onToggleFavorite(pokemon.id)}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? `Remover ${pokemon.name} dos favoritos` : `Favoritar ${pokemon.name}`}
        className="absolute right-2 top-2 z-10 grid size-9 place-items-center rounded-full bg-white/80 text-xl shadow transition-transform hover:scale-110"
      >
        <span className={isFavorite ? 'text-dex-red' : 'text-slate-400'}>{isFavorite ? '★' : '☆'}</span>
      </button>
    </article>
  )
}
