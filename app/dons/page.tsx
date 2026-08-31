'use client'

import { useState } from 'react'

const MONTANTS_SUGGERES = [10, 20, 50, 100]

export default function Dons() {
  const [type, setType] = useState<'ponctuel' | 'mensuel'>('ponctuel')
  const [montant, setMontant] = useState<number | null>(null)
  const [montantLibre, setMontantLibre] = useState('')

  const montantFinal = montantLibre ? parseFloat(montantLibre) : montant

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO : brancher HelloAsso ici une fois le compte confirmé
    alert(`Simulation : don ${type} de ${montantFinal}€ — HelloAsso pas encore connecté.`)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h1>Faire un don</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => setType('ponctuel')}
            style={{ fontWeight: type === 'ponctuel' ? 'bold' : 'normal' }}
          >
            Ponctuel
          </button>
          <button
            type="button"
            onClick={() => setType('mensuel')}
            style={{ fontWeight: type === 'mensuel' ? 'bold' : 'normal' }}
          >
            Mensuel
          </button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          {MONTANTS_SUGGERES.map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => {
                setMontant(m)
                setMontantLibre('')
              }}
              style={{ fontWeight: montant === m && !montantLibre ? 'bold' : 'normal' }}
            >
              {m}€
            </button>
          ))}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <input
            type="number"
            placeholder="Autre montant (€)"
            value={montantLibre}
            onChange={(e) => {
              setMontantLibre(e.target.value)
              setMontant(null)
            }}
            min={1}
          />
        </div>

        <button type="submit" disabled={!montantFinal || montantFinal <= 0}>
          Faire un don de {montantFinal || '...'}€ {type === 'mensuel' ? '/mois' : ''}
        </button>
      </form>
    </div>
  )
}