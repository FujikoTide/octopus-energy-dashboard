import { NextResponse, NextRequest } from 'next/server'
import { OctopusEnergy } from '@/lib/api/octopus'
import { EnergyName, OctopusApiResult } from '@/lib/types/energy'

export async function GET(request: NextRequest) {
  try {
    const octopus = new OctopusEnergy()
    const energy = request.nextUrl.searchParams.get('energyType')
    const data = await octopus.get(energy as EnergyName)
    return NextResponse.json<OctopusApiResult<unknown>>({ ok: true, data })
  } catch (e) {
    return NextResponse.json<OctopusApiResult<unknown>>(
      { ok: false, error: e instanceof Error ? e.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
