"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useFavorites } from "@/contexts/favorites-context"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter favorites based on search query
  const filteredFavorites = favorites.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-red-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">My Favorite Restaurants</h1>
              <p className="text-xl mb-8">Your saved food spots in Trinidad and Tobago</p>

              <div className="relative max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search your favorites..."
                  className="h-12 pl-4 pr-4 py-3 w-full text-gray-900 bg-white border-0 rounded-full shadow-lg focus:ring-2 focus:ring-red-500 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Favorites List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredFavorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFavorites.map((restaurant) => (
                  <Card key={restaurant.id} className="overflow-hidden hover:shadow-md transition-all">
                    <div className="relative h-48 w-full">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 border border-gray-200"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          removeFavorite(restaurant.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <Link href={`/restaurant/${restaurant.id}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900 hover:text-red-600 transition">
                            {restaurant.name}
                          </h3>
                          <div className="flex items-center bg-red-100 text-red-600 px-2 py-1 rounded">
                            <Star className="h-4 w-4 fill-red-600 text-red-600 mr-1" />
                            <span>{restaurant.rating}</span>
                          </div>
                        </div>
                      </Link>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{restaurant.location}</span>
                      </div>
                      <Button className="w-full bg-red-600 hover:bg-red-700 transition-transform hover:scale-105">
                        <Link href={`/restaurant/${restaurant.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full p-6 inline-flex mb-6">
                  <Star className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h2>
                <p className="text-gray-600 mb-6">
                  Start exploring restaurants and add them to your favorites to see them here.
                </p>
                <Button className="bg-red-600 hover:bg-red-700 transition-transform hover:scale-105">
                  <Link href="/reviews">Explore Restaurants</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
