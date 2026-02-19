import 'server-only'

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

  async getElectricityData(): Promise<unknown> {
    const apiKey = this.API_KEY
    if (!apiKey) {
      throw new Error('Missing Api Key')
    }

    const basic = Buffer.from(`${apiKey}:`).toString('base64')
    const electricityUrl = `${this.baseUrl}electricity-meter-points/${this.ELECTRICITY_MPAN}/meters/${this.ELECTRICITY_SERIAL}/consumption/`

    console.log(electricityUrl)

    const res = await fetch(electricityUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${basic}`,
      },
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }
    return await res.json()
  }
}
