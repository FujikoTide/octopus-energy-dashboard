import 'server-only'
import {
  EnergyConsumption,
  EnergyName,
  OctopusApiResult,
} from '../types/energy'

export class OctopusEnergy {
  private readonly API_KEY: string
  private readonly ELECTRICITY_MPAN: string
  private readonly ELECTRICITY_SERIAL: string
  private readonly GAS_MPAN: string
  private readonly GAS_SERIAL: string
  private readonly baseUrl: string

  constructor() {
    this.API_KEY = process.env.API_KEY ?? ''
    this.ELECTRICITY_MPAN = process.env.ELECTRICITY_MPAN ?? ''
    this.ELECTRICITY_SERIAL = process.env.ELECTRICITY_SERIAL ?? ''
    this.GAS_MPAN = process.env.GAS_MPAN ?? ''
    this.GAS_SERIAL = process.env.GAS_SERIAL ?? ''
    this.baseUrl = 'https://api.octopus.energy/v1/'
  }

  async get(energy: EnergyName): Promise<OctopusApiResult<EnergyConsumption>> {
    enum dataType {
      'electricity' = 'electricity-meter-points',
      'gas' = 'gas-meter-points',
    }

    const apiKey = this.API_KEY
    if (!apiKey) {
      throw new Error('Missing Api Key')
    }

    let MPAN = ''
    let SERIAL = ''

    if (energy === 'electricity') {
      MPAN = this.ELECTRICITY_MPAN
      SERIAL = this.ELECTRICITY_SERIAL
    } else if (energy === 'gas') {
      MPAN = this.GAS_MPAN
      SERIAL = this.GAS_SERIAL
    }

    const basic = Buffer.from(`${apiKey}:`).toString('base64')
    const url = `${this.baseUrl}${dataType[energy]}/${MPAN}/meters/${SERIAL}/consumption/`

    console.log(url)
    console.log('Upstream fetch starting', new Date().toISOString())

    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${basic}`,
      },
      next: {
        revalidate: 30,
      },
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }
    return await res.json()
  }
}
