import { useState } from 'react'
import { artworkUrl } from '../utils/pokemon'

export default function PokemonImage({ id, name, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <svg viewBox="0 0 100 100" role="img" aria-label={name} className={`${className} opacity-60`}>
        <circle cx="50" cy="50" r="44" fill="#fff" stroke="#1e1f26" strokeWidth="6" />
        <path d="M6 50a44 44 0 0 1 88 0Z" fill="#d92d27" stroke="#1e1f26" strokeWidth="6" />
        <path d="M6 50h88" stroke="#1e1f26" strokeWidth="6" />
        <circle cx="50" cy="50" r="12" fill="#fff" stroke="#1e1f26" strokeWidth="6" />
      </svg>
    )
  }

  return (
    <img
      src={artworkUrl(id)}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} object-contain drop-shadow-[0_6px_6px_rgb(0_0_0/.35)]`}
    />
  )
}
