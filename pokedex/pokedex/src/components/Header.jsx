const TABS = [
  { id: 'dex', label: 'Pokédex' },
  { id: 'trainers', label: 'Treinadores' },
]

export default function Header({ view, onViewChange }) {
  return (
    <header className="border-b-8 border-dex-red-dark bg-dex-red shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="lens-boot relative size-14 shrink-0 rounded-full border-4 border-white bg-white shadow-md sm:size-16" aria-hidden="true">
            <img src="./public/images/Pokebola.png" alt="Pokebola" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Pokédex</h1>
        </div>

        <nav className="ml-auto flex gap-2" aria-label="Seções">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onViewChange(tab.id)}
              aria-current={view === tab.id ? 'page' : undefined}
              className={`rounded-lg px-4 py-2 font-display text-sm font-semibold transition-colors sm:text-base ${
                view === tab.id
                  ? 'bg-dex-shell text-white shadow-inner'
                  : 'bg-dex-red-dark/60 text-white/90 hover:bg-dex-red-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
