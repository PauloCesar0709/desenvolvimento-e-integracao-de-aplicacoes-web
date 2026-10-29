import { useCallback, useEffect, useMemo, useState } from 'react'
import EmptyState from './components/EmptyState'
import Header from './components/Header'
import PokemonDetails from './components/PokemonDetails'
import PokemonList from './components/PokemonList'
import SearchBar from './components/SearchBar'
import TrainerList from './components/TrainerList'
import TypeFilter from './components/TypeFilter'
import {
  SORT_OPTIONS,
  availableTypes,
  matchesQuery,
  pokemons,
  sortPokemons,
  trainers,
} from './utils/pokemon'

const FAVORITES_KEY = 'pokedex:favorites'

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) ?? []
  } catch {
    return []
  }
}

export default function App() {
  const [view, setView] = useState('dex')
  const [query, setQuery] = useState('')
  const [activeType, setActiveType] = useState('')
  const [sortBy, setSortBy] = useState('id')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [favorites, setFavorites] = useState(loadFavorites)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch {
      /* armazenamento indisponível: ignorar */
    }
  }, [favorites])

  // Estado derivado: lista filtrada e ordenada
  const visible = useMemo(() => {
    const filtered = pokemons.filter(
      (p) =>
        matchesQuery(p, query) &&
        (!activeType || p.types.some((t) => t.name === activeType)) &&
        (!onlyFavorites || favorites.includes(p.id)),
    )
    return sortPokemons(filtered, sortBy)
  }, [query, activeType, sortBy, onlyFavorites, favorites])

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }, [])

  const closeDetails = useCallback(() => setSelectedId(null), [])

  const resetFilters = () => {
    setQuery('')
    setActiveType('')
    setOnlyFavorites(false)
  }

  const pickRandom = () => {
    setSelectedId(pokemons[Math.floor(Math.random() * pokemons.length)].id)
  }

  const selected = pokemons.find((p) => p.id === selectedId)

  return (
    <div className="min-h-screen">
      <Header view={view} onViewChange={setView} />

      <main className="mx-auto max-w-6xl px-4 py-6">
        {view === 'dex' ? (
          <>
            <section className="mb-6 space-y-4" aria-label="Pesquisa e filtros">
              <div className="flex flex-col gap-4 md:flex-row">
                <SearchBar value={query} onChange={setQuery} />

                <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  Ordenar por
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-xl bg-dex-panel px-2 py-3 text-base text-white"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </label>
              </div>

              <TypeFilter types={availableTypes} active={activeType} onChange={setActiveType} />

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOnlyFavorites((v) => !v)}
                  aria-pressed={onlyFavorites}
                  className={`rounded-lg px-4 py-2 font-display text-sm font-semibold ${
                    onlyFavorites ? 'bg-dex-yellow text-dex-shell' : 'bg-dex-panel text-white hover:bg-dex-panel/70'
                  }`}
                >
                  ★ Favoritos ({favorites.length})
                </button>
                <button
                  type="button"
                  onClick={pickRandom}
                  className="rounded-lg bg-dex-lens px-4 py-2 font-display text-sm font-semibold text-white hover:brightness-110"
                >
                  Pokémon aleatório
                </button>
                <p className="ml-auto text-sm text-slate-400" aria-live="polite">
                  {visible.length} de {pokemons.length} Pokémon
                </p>
              </div>
            </section>

            {visible.length > 0 ? (
              <PokemonList
                pokemons={visible}
                favorites={favorites}
                onSelect={setSelectedId}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <EmptyState onReset={resetFilters} />
            )}
          </>
        ) : (
          <TrainerList trainers={trainers} onSelectPokemon={setSelectedId} />
        )}
      </main>

      {selected && (
        <PokemonDetails
          key={selected.id}
          pokemon={selected}
          isFavorite={favorites.includes(selected.id)}
          onClose={closeDetails}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  )
}
