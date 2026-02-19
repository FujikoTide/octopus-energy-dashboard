'use client'

import { useEffect, useState } from 'react'

export default function TestOctopus() {
  const [data, setData] = useState<unknown>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/octopus/electricity')
        setData(await res.json())
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error')
      }
    })()
  }, [])

  if (error) {
    return <pre>{error}</pre>
  }
  return <pre>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
}
