import { NextResponse, NextRequest } from 'next/server'
import { OctopusEnergy } from '@/lib/api/octopus'
import { EnergyName } from '@/lib/types/energy'

type OctopusApiResult = {
  ok: true
  data: unknown
}

export async function GET(
  request: NextRequest,
  context: RouteContext<'/api/octopus/[energy]'>,
) {
  const octopus = new OctopusEnergy()
  const { energy } = await context.params
  const data = await octopus.get(energy as EnergyName)
  return NextResponse.json<OctopusApiResult>({ ok: true, data })
}
