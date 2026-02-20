'use client'

import { useOctopus } from '@/hooks/use-octopus'
import {
  EnergyConsumption,
  EnergyName,
  OctopusApiResult,
} from '@/lib/types/energy'
import EnergyChart from './energy-chart'

type EnergyProps = {
  energy: EnergyName
}

export default function EnergyPanel({ energy }: EnergyProps) {
  const { data, error, loading } =
    useOctopus<OctopusApiResult<EnergyConsumption>>(energy)

  console.log(data, error, loading)

  if (loading) {
    return <pre>Loading...</pre>
  }
  if (error) {
    return <pre>Error: {error}</pre>
  }
  if (!data) {
    return <pre>No Data</pre>
  }

  return <EnergyChart energyData={data} />
}
