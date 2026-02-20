import { EnergyName } from '@/lib/types/energy'
import { useEffect, useState } from 'react'

type OctopusState<T> = {
  data: T | null
  error: string | null
  loading: boolean
}

export function useOctopus<T = unknown>(energy: EnergyName): OctopusState<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/octopus/?energyType=${energy}`, {
          signal: controller.signal,
        })
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        const json = (await res.json()) as T
        setData(json)
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') {
          return
        }
        setError(e instanceof Error ? e.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [energy])
  return { data, error, loading }
}
