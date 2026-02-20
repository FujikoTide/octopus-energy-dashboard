import { EnergyType } from '@/lib/types/energy'
import EnergyPanel from '../components/charts/energy-panel'

export default function Home() {
  return (
    <main>
      <h1>Test</h1>
      <EnergyPanel energy={EnergyType.electricity} />
      <EnergyPanel energy={EnergyType.gas} />
    </main>
  )
}
