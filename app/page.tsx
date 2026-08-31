'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function Home() {
  const [status, setStatus] = useState('Connexion en cours...')

  useEffect(() => {
    supabase.auth.getSession().then(({ error }) => {
      if (error) {
        setStatus('Erreur de connexion : ' + error.message)
      } else {
        setStatus('Connexion à Supabase réussie ✅')
      }
    })
  }, [])

  return <div style={{ padding: '2rem' }}>{status}</div>
}