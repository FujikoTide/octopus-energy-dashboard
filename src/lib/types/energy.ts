export const EnergyType = {
  electricity: 'electricity',
  gas: 'gas',
} as const

export type EnergyName = (typeof EnergyType)[keyof typeof EnergyType]

const ENERGY_SET = new Set<EnergyName>(Object.values(EnergyType))

export function isEnergyName(x: unknown): x is EnergyName {
  return typeof x === 'string' && ENERGY_SET.has(x as EnergyName)
}
