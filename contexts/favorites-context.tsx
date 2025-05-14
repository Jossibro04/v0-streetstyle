"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the restaurant type
export interface FavoriteRestaurant {
  id: string | number
  name: string
  location: string
  rating: number
  image: string
}

// Define the context type
type FavoritesContextType = {
  favorites: FavoriteRestaurant[]
  addFavorite: (restaurant: FavoriteRestaurant) => void
  removeFavorite: (id: string | number) => void
  isFavorite: (id: string | number) => boolean
}

// Create the context with default values
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
})

// Define props for the provider
interface FavoritesProviderProps {
  children: ReactNode
}

// Create the provider component
export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<FavoriteRestaurant[]>([])

  // Load saved favorites on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error("Error parsing favorites:", error)
      }
    }
  }, [])

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  // Add a restaurant to favorites
  const addFavorite = (restaurant: FavoriteRestaurant) => {
    setFavorites((prevFavorites) => {
      // Check if already in favorites
      if (prevFavorites.some((fav) => fav.id === restaurant.id)) {
        return prevFavorites
      }
      return [...prevFavorites, restaurant]
    })
  }

  // Remove a restaurant from favorites
  const removeFavorite = (id: string | number) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id))
  }

  // Check if a restaurant is in favorites
  const isFavorite = (id: string | number) => {
    return favorites.some((fav) => fav.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

// Custom hook to use the favorites context
export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
