'use client'

import { useOctopus } from '@/hooks/use-octopus'
import { EnergyName } from '@/lib/types/energy'

type EnergyProps = {
  energy: EnergyName
}

// export type

export default function EnergyPanel({ energy }: EnergyProps) {
  const { data, error, loading } = useOctopus(energy)

  if (loading) {
    return <pre>Loading...</pre>
  }
  if (error) {
    return <pre>Error: {error}</pre>
  }

  return <pre>{data ? JSON.stringify(data, null, 2) : 'No Data'}</pre>
}
