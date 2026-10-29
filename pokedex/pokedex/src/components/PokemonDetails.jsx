import { useEffect, useRef, useState } from 'react'
import PokemonImage from './PokemonImage'
import StatBar from './StatBar'
import TypeBadge from './TypeBadge'
import { STAT_LABELS, TYPE_COLORS, pad } from '../utils/pokemon'

function usePokeApiInfo(id) {
  const [state, setState] = useState({ status: 'loading', info: null })

  useEffect(() => {
    const controller = new AbortController()
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Falha na PokéAPI')
        return res.json()
      })
      .then((json) =>
        setState({
          status: 'ok',
          info: {
            height: json.height / 10,
            weight: json.weight / 10,
            abilities: json.abilities.map((a) => a.ability.name.replace('-', ' ')),
          },
        }),
      )
      .catch((err) => {
        if (err.name !== 'AbortError') setState({ status: 'error', info: null })
      })
    return () => controller.abort()
  }, [id])

  return state
}

export default function PokemonDetails({ pokemon, isFavorite, onClose, onToggleFavorite }) {
  const closeRef = useRef(null)
  const { status, info } = usePokeApiInfo(pokemon.id)
  const color = TYPE_COLORS[pokemon.types[0]?.name] ?? TYPE_COLORS.Typeless
  const total = STAT_LABELS.reduce((sum, s) => sum + pokemon.stats[s.key], 0)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        onClick={(e) => e.stopPropagation()}
        className="modal-in max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-dex-screen text-slate-900 shadow-2xl sm:rounded-3xl"
      >
        <div
          className="relative flex flex-col items-center px-6 pb-2 pt-6"
          style={{ background: `radial-gradient(circle at 50% 60%, ${color}66, transparent 72%)` }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-dex-shell text-lg font-bold text-white hover:bg-dex-red"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={() => onToggleFavorite(pokemon.id)}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Favoritar'}
            className="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-white/80 text-2xl shadow"
          >
            <span className={isFavorite ? 'text-dex-red' : 'text-slate-400'}>{isFavorite ? '★' : '☆'}</span>
          </button>
          <PokemonImage id={pokemon.id} name={pokemon.name} className="size-48 sm:size-56" />
          <p className="font-display text-lg font-bold text-slate-500">#{pad(pokemon.id)}</p>
          <h2 id="details-title" className="font-display text-4xl font-bold">{pokemon.name}</h2>
          <div className="mt-2 flex gap-2">
            {pokemon.types.map((t) => <TypeBadge key={t.id} name={t.name} size="md" />)}
          </div>
        </div>

        <div className="space-y-2 px-6 pb-6 pt-4">
          {STAT_LABELS.map((s) => (
            <StatBar key={s.key} label={s.label} value={pokemon.stats[s.key]} />
          ))}
          <p className="pt-1 text-right text-sm text-slate-600">
            Total: <strong className="font-display text-base text-slate-900">{total}</strong>
          </p>

          <div className="mt-3 rounded-xl bg-slate-900/5 p-3 text-sm" aria-live="polite">
            {status === 'loading' && <p className="text-slate-500">Buscando dados extras na PokéAPI...</p>}
            {status === 'error' && <p className="text-slate-500">Dados extras indisponíveis no momento (PokéAPI).</p>}
            {status === 'ok' && (
              <dl className="grid grid-cols-3 gap-3">
                <div><dt className="text-slate-500">Altura</dt><dd className="font-bold">{info.height} m</dd></div>
                <div><dt className="text-slate-500">Peso</dt><dd className="font-bold">{info.weight} kg</dd></div>
                <div><dt className="text-slate-500">Habilidades</dt><dd className="font-bold capitalize">{info.abilities.join(', ')}</dd></div>
              </dl>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
