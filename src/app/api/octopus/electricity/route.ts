import { NextResponse } from 'next/server'
import { OctopusEnergy } from '@/lib/api/octopus'

type OctopusApiResult = {
  ok: true
  data: unknown
}

export async function GET() {
  const octopus = new OctopusEnergy()
  const data = await octopus.getElectricityData()
  return NextResponse.json<OctopusApiResult>({ ok: true, data })
}
