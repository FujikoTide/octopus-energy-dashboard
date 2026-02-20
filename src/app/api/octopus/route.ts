import { NextResponse, NextRequest } from 'next/server'
import { OctopusEnergy } from '@/lib/api/octopus'
import {
  EnergyConsumption,
  EnergyName,
  OctopusApiResult,
} from '@/lib/types/energy'

export async function GET(request: NextRequest) {
  const octopus = new OctopusEnergy()
  const energy = request.nextUrl.searchParams.get('energyType')
  const data = await octopus.get(energy as EnergyName)
  return NextResponse.json<OctopusApiResult<EnergyConsumption>>(data)
}
