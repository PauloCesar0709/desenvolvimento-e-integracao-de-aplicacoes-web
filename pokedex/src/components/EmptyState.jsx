export default function EmptyState({ onReset }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl bg-dex-panel p-8 text-center">
      <svg viewBox="0 0 100 100" className="mx-auto size-20 opacity-70" aria-hidden="true">
        <circle cx="50" cy="50" r="44" fill="#fff" stroke="#1e1f26" strokeWidth="6" />
        <path d="M6 50a44 44 0 0 1 88 0Z" fill="#d92d27" stroke="#1e1f26" strokeWidth="6" />
        <path d="M6 50h88" stroke="#1e1f26" strokeWidth="6" />
        <circle cx="50" cy="50" r="12" fill="#fff" stroke="#1e1f26" strokeWidth="6" />
      </svg>
      <h2 className="mt-4 font-display text-xl font-bold">Nenhum Pokémon encontrado</h2>
      <p className="mt-1 text-slate-300">Revise o nome ou o número, ou escolha outro tipo.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-lg bg-dex-yellow px-5 py-2 font-display font-bold text-dex-shell hover:brightness-110"
      >
        Limpar filtros
      </button>
    </div>
  )
}
