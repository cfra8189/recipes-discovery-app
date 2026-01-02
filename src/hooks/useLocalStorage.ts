import { useEffect, useState } from 'react'

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) {
        return JSON.parse(stored) as T
      }
    } catch (error) {
      console.warn('Failed to read localStorage', error)
    }
    return initialValue
  })

  useEffect(() => {
    try {
      const serialized = JSON.stringify(value)
      window.localStorage.setItem(key, serialized)
    } catch (error) {
      console.warn('Failed to write localStorage', error)
    }
  }, [key, value])

  return [value, setValue] as const
}

export default useLocalStorage
