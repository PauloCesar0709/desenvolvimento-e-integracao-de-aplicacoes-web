import data from '../data/pokedex-data.json'

export const pokemons = data.pokemon
export const trainers = data.trainers

export const STAT_LABELS = [
  { key: 'hp', label: 'HP', short: 'HP' },
  { key: 'attack', label: 'Ataque', short: 'ATK' },
  { key: 'defense', label: 'Defesa', short: 'DEF' },
  { key: 'specialAttack', label: 'Ataque Esp.', short: 'SP.ATK' },
  { key: 'specialDefense', label: 'Defesa Esp.', short: 'SP.DEF' },
  { key: 'speed', label: 'Velocidade', short: 'SPD' },
]

export const SORT_OPTIONS = [
  { value: 'id', label: 'Número' },
  { value: 'name', label: 'Nome' },
  ...STAT_LABELS.map((s) => ({ value: s.key, label: s.label })),
]

export const TYPE_COLORS = {
  Normal: '#A8A77A',
  Fire: '#EE8130',
  Water: '#6390F0',
  Grass: '#4FB24A',
  Electric: '#F7D02C',
  Ice: '#7DD3D0',
  Fighting: '#C22E28',
  Poison: '#A33EA1',
  Ground: '#C9A74E',
  Flying: '#8E9BF0',
  Psychic: '#F95587',
  Bug: '#A6B91A',
  Rock: '#B6A136',
  Ghost: '#735797',
  Dark: '#6F5848',
  Dragon: '#6F35FC',
  Steel: '#9AA3B8',
  Typeless: '#9CA3AF',
}

// Tipos que realmente aparecem nos Pokémon do arquivo de dados
export const availableTypes = data.types
  .filter((t) => pokemons.some((p) => p.types.some((pt) => pt.id === t.id)))
  .map((t) => t.name)

export const pad = (id) => String(id).padStart(3, '0')

// Imagens oficiais servidas pelo repositório de sprites da PokéAPI (não exige chamada de API)
export const artworkUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

const normalize = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()

export function matchesQuery(pokemon, query) {
  const q = normalize(query).replace('#', '')
  if (!q) return true
  return (
    normalize(pokemon.name).includes(q) ||
    String(pokemon.id) === q ||
    pad(pokemon.id).includes(q)
  )
}

export function sortPokemons(list, sortBy) {
  const sorted = [...list]
  if (sortBy === 'id') return sorted.sort((a, b) => a.id - b.id)
  if (sortBy === 'name') return sorted.sort((a, b) => a.name.localeCompare(b.name))
  return sorted.sort((a, b) => b.stats[sortBy] - a.stats[sortBy] || a.id - b.id)
}
