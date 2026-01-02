import { createContext, useContext, useMemo } from 'react'
import { type ReactNode } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

type FavoritesContextValue = {
  favorites: string[]
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)

type ProviderProps = {
  children: ReactNode
}

export function FavoritesProvider({ children }: ProviderProps) {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', [])

  const addFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id))
  }

  const isFavorite = (id: string) => favorites.includes(id)

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite, isFavorite }),
    [favorites],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return ctx
}
