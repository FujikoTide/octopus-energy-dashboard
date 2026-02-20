import { EnergyType } from '@/lib/types/energy'
import TestOctopus from './test-octopus'

export default function Home() {
  return (
    <main>
      <h1>Test</h1>
      <TestOctopus energy={EnergyType.electricity} />
      <TestOctopus energy={EnergyType.gas} />
    </main>
  )
}
