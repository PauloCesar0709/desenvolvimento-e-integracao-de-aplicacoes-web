import PokemonImage from './PokemonImage'
import { pad, pokemons } from '../utils/pokemon'

export default function TrainerList({ trainers, onSelectPokemon }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {trainers.map((trainer) => {
        const team = trainer.pokemonIds
          .map((id) => pokemons.find((p) => p.id === id))
          .filter(Boolean)

        return (
          <li key={trainer.id} className="rounded-2xl bg-dex-panel p-5 shadow-md">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-bold">{trainer.name}</h2>
              <div className="flex items-center gap-2" title={`${trainer.badges} insígnias`}>
                <span className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: Math.min(trainer.badges, 10) }, (_, i) => (
                    <span key={i} className="size-3 rotate-45 rounded-[2px] bg-dex-yellow" />
                  ))}
                </span>
                <span className="font-display text-sm font-semibold text-dex-yellow">
                  {trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'}
                </span>
              </div>
            </div>

            {team.length === 0 ? (
              <p className="mt-4 text-sm text-slate-400">Nenhum Pokémon registrado.</p>
            ) : (
              <ul className="mt-4 flex flex-wrap gap-2">
                {team.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => onSelectPokemon(p.id)}
                      className="flex items-center gap-2 rounded-xl bg-dex-screen py-1 pl-1 pr-3 text-slate-900 transition-transform hover:-translate-y-0.5"
                    >
                      <PokemonImage id={p.id} name="" className="size-10" />
                      <span className="text-left leading-tight">
                        <span className="block font-display text-sm font-bold">{p.name}</span>
                        <span className="block text-[0.7rem] text-slate-500">#{pad(p.id)}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}
