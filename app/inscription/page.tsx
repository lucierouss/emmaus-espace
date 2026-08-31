'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function Inscription() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setMessage('Erreur : ' + error.message)
    } else {
      setMessage('Compte créé ! Vérifie ta boîte mail pour confirmer.')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Créer un compte</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit">S'inscrire</button>
      </form>
      <p>{message}</p>
    </div>
  )
}