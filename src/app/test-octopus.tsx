'use client'

import { EnergyName } from '@/lib/types/energy'
import { useEffect, useState } from 'react'

type EnergyProps = {
  energy: EnergyName
}

export default function TestOctopus({ energy }: EnergyProps) {
  const [data, setData] = useState<unknown>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/octopus/${energy}`)
        setData(await res.json())
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error')
      }
    })()
  }, [energy])

  if (error) {
    return <pre>{error}</pre>
  }
  return <pre>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
}
