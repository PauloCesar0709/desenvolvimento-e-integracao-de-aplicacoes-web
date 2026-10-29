export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1">
      <label htmlFor="search" className="sr-only">Pesquisar Pokémon por nome ou número</label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pesquisar Pokémon por nome ou número..."
        autoComplete="off"
        className="w-full rounded-xl border-2 border-transparent bg-dex-screen px-4 py-3 text-base text-slate-900 shadow-inner placeholder:text-slate-500 focus:border-dex-lens"
      />
    </div>
  )
}
