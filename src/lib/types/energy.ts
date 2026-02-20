export const EnergyType = {
  electricity: 'electricity',
  gas: 'gas',
} as const

export type EnergyName = (typeof EnergyType)[keyof typeof EnergyType]

const ENERGY_SET = new Set<EnergyName>(Object.values(EnergyType))

export function isEnergyName(x: unknown): x is EnergyName {
  return typeof x === 'string' && ENERGY_SET.has(x as EnergyName)
}

export type OctopusApiResult<T> = OctopusApiOk<T> | OctopusApiError

export type OctopusApiOk<T> = {
  ok: true
  data: T
}

export type OctopusApiError = {
  ok: false
  error: string
}

export interface EnergyConsumption {
  count: number
  next: string | null
  previous: string | null
  results: EnergyRecord[]
}

export interface EnergyRecord {
  consumption: number
  interval_start: string
  interval_end: string
}
