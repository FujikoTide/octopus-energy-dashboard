export const EnergyType = {
  electricity: 'electricity',
  gas: 'gas',
} as const

export type EnergyName = (typeof EnergyType)[keyof typeof EnergyType]

const ENERGY_SET = new Set<EnergyName>(Object.values(EnergyType))

export function isEnergyName(x: unknown): x is EnergyName {
  return typeof x === 'string' && ENERGY_SET.has(x as EnergyName)
}

export type OctopusApiResult<T> = OctopusApiOk<T> | OctopusApiError<T>

export type OctopusApiOk<T> = {
  ok: true
  data: T
}

export type OctopusApiError<T> = {
  ok: false
  error: T
}

export interface EnergyConsumption {
  count: number
  next: string
  previous: string
  results: EnergyRecord[]
}

export interface EnergyRecord {
  consumption: number
  interval_start: Date
  interval_end: Date
}
