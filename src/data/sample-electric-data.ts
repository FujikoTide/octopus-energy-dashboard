import { EnergyConsumption } from '@/lib/types/energy'

export const sampleElectricityData: EnergyConsumption = {
  count: 336,
  next: 'https://api.octopus.energy/v1/electricity-meter-points/3333333333333/meters/44P4444444/consumption/?page=2',
  previous: null,
  results: [
    {
      consumption: 0.302,
      interval_start: '2026-02-19T23:30:00Z',
      interval_end: '2026-02-20T00:00:00Z',
    },
    {
      consumption: 0.286,
      interval_start: '2026-02-19T23:00:00Z',
      interval_end: '2026-02-19T23:30:00Z',
    },
    {
      consumption: 0.295,
      interval_start: '2026-02-19T22:30:00Z',
      interval_end: '2026-02-19T23:00:00Z',
    },
    {
      consumption: 0.356,
      interval_start: '2026-02-19T22:00:00Z',
      interval_end: '2026-02-19T22:30:00Z',
    },
    {
      consumption: 0.342,
      interval_start: '2026-02-19T21:30:00Z',
      interval_end: '2026-02-19T22:00:00Z',
    },
    {
      consumption: 0.359,
      interval_start: '2026-02-19T21:00:00Z',
      interval_end: '2026-02-19T21:30:00Z',
    },
    {
      consumption: 0.428,
      interval_start: '2026-02-19T20:30:00Z',
      interval_end: '2026-02-19T21:00:00Z',
    },
    {
      consumption: 0.359,
      interval_start: '2026-02-19T20:00:00Z',
      interval_end: '2026-02-19T20:30:00Z',
    },
    {
      consumption: 0.34,
      interval_start: '2026-02-19T19:30:00Z',
      interval_end: '2026-02-19T20:00:00Z',
    },
    {
      consumption: 0.38,
      interval_start: '2026-02-19T19:00:00Z',
      interval_end: '2026-02-19T19:30:00Z',
    },
    {
      consumption: 0.549,
      interval_start: '2026-02-19T18:30:00Z',
      interval_end: '2026-02-19T19:00:00Z',
    },
  ],
}
