import { useEffect, useState } from 'react'

type FetchState<T> = {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

function useFetch<T>(url: string, options?: RequestInit): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async (controller?: AbortController) => {
    setLoading(true)
    setError(null)

    const abortController = controller ?? new AbortController()

    try {
      const response = await fetch(url, { ...options, signal: abortController.signal })
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const json = (await response.json()) as T
      setData(json)
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    fetchData(controller)

    return () => controller.abort()
  }, [url])

  const refetch = () => fetchData()

  return { data, loading, error, refetch }
}

export default useFetch
