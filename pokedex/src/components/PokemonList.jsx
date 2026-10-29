import PokemonCard from './PokemonCard'

export default function PokemonList({ pokemons, favorites, onSelect, onToggleFavorite }) {
  return (
    <ul className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          <PokemonCard
            pokemon={pokemon}
            isFavorite={favorites.includes(pokemon.id)}
            onSelect={onSelect}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  )
}
