import { EnergyConsumption, OctopusApiResult } from '@/lib/types/energy'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface ChartProps {
  energyData: OctopusApiResult<EnergyConsumption>
}

export default function EnergyChart({ energyData }: ChartProps) {
  if (!energyData.ok) {
    return <pre>API Error: {energyData.error}</pre>
  }
  const data = energyData.data.results
  return (
    <ResponsiveContainer width='100%' aspect={16 / 9}>
      <LineChart data={data}>
        <XAxis dataKey='interval_start' />
        <YAxis />
        <Tooltip />
        <Line dataKey='consumption' />
      </LineChart>
    </ResponsiveContainer>
  )
}
