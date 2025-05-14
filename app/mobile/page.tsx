"use client"

import { useState } from "react"
import MobileNavbar from "@/components/mobile-app/mobile-navbar"
import MobileReviewCard from "@/components/mobile-app/mobile-review-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Filter, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useFavorites } from "@/contexts/favorites-context"

// Mock data for trending reviews
const trendingReviews = [
  {
    id: 1,
    restaurantName: "Richard's Bake & Shark",
    location: "Maracas Bay",
    rating: 4.8,
    content:
      "The best bake and shark I've ever had! The garlic sauce is to die for. The bread was perfectly fried and the shark was tender and flavorful.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Maria R.",
    date: "2 days ago",
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    restaurantName: "Sauce Doubles",
    location: "Curepe Junction",
    rating: 4.7,
    content:
      "Perfect balance of spicy and savory. The bara is so soft! I always get mine with slight pepper and extra chadon beni.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Anil K.",
    date: "5 days ago",
    likes: 18,
    comments: 5,
  },
  {
    id: 3,
    restaurantName: "D'Avenue Corn Soup",
    location: "Port of Spain",
    rating: 4.5,
    content: "Thick, hearty and full of flavor. A must-try on a rainy evening. The dumplings are perfectly cooked.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Jerome T.",
    date: "1 week ago",
    likes: 15,
    comments: 3,
  },
]

// Mock data for nearby restaurants
const nearbyRestaurants = [
  {
    id: 1,
    name: "Richard's Bake & Shark",
    location: "Maracas Bay",
    rating: 4.8,
    image: "/placeholder.svg?height=150&width=150",
    distance: "0.5 km",
  },
  {
    id: 2,
    name: "Sauce Doubles",
    location: "Curepe Junction",
    rating: 4.7,
    image: "/placeholder.svg?height=150&width=150",
    distance: "1.2 km",
  },
  {
    id: 3,
    name: "D'Avenue Corn Soup",
    location: "Port of Spain",
    rating: 4.5,
    image: "/placeholder.svg?height=150&width=150",
    distance: "0.8 km",
  },
  {
    id: 4,
    name: "Island Grill Jerk Chicken",
    location: "San Fernando",
    rating: 4.6,
    image: "/placeholder.svg?height=150&width=150",
    distance: "1.5 km",
  },
]

export default function MobileAppPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const { favorites } = useFavorites()

  // Add a new tab content for favorites
  return (
    <div className="min-h-screen bg-gray-100 pb-20 pt-14">
      <MobileNavbar />

      <main className="container mx-auto px-4 py-4">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Input
              placeholder="Search for restaurants, cuisines..."
              className="pl-10 pr-4 py-2 rounded-full border-gray-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Location Bar */}
        <div className="flex items-center justify-between mb-6 bg-white p-3 rounded-lg shadow-sm">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-red-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-900">Current Location</p>
              <p className="text-xs text-gray-600">Port of Spain, Trinidad</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-red-600">
            Change
          </Button>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="feed" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Latest Reviews</h2>
              <Button variant="ghost" size="sm" className="text-red-600 p-0">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>

            {trendingReviews.map((review) => (
              <MobileReviewCard
                key={review.id}
                id={review.id}
                restaurantName={review.restaurantName}
                location={review.location}
                rating={review.rating}
                content={review.content}
                image={review.image}
                author={review.author}
                date={review.date}
                likes={review.likes}
                comments={review.comments}
              />
            ))}

            <div className="text-center pt-4">
              <Button variant="outline" className="w-full">
                Load More
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="nearby">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Nearby Restaurants</h2>
              <Button variant="ghost" size="sm" className="text-red-600 p-0">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {nearbyRestaurants.map((restaurant) => (
                <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id}>
                  <div className="flex bg-white rounded-lg overflow-hidden border border-gray-200">
                    <div className="relative w-24 h-24">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 p-3">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900">{restaurant.name}</h3>
                        <div className="flex items-center text-sm">
                          <span className="text-red-600 font-medium">{restaurant.rating}</span>
                          <span className="ml-1">★</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{restaurant.location}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{restaurant.distance}</span>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Open</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center pt-6">
              <Button variant="outline" className="w-full">
                View Map
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="popular">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Popular This Week</h2>
              <Button variant="ghost" size="sm" className="text-red-600 p-0">
                See All
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {nearbyRestaurants.map((restaurant) => (
                <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id}>
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                    <div className="relative w-full h-32">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 truncate">{restaurant.name}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-gray-600 text-xs truncate">{restaurant.location}</p>
                        <div className="flex items-center text-sm">
                          <span className="text-red-600 font-medium">{restaurant.rating}</span>
                          <span className="ml-1">★</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center pt-6">
              <Button variant="outline" className="w-full">
                Load More
              </Button>
            </div>
          </TabsContent>
          {/* New Favorites Tab */}
          <TabsContent value="favorites">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">My Favorites</h2>
            </div>

            {favorites.length > 0 ? (
              <div className="space-y-4">
                {favorites.map((restaurant) => (
                  <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id}>
                    <div className="flex bg-white rounded-lg overflow-hidden border border-gray-200">
                      <div className="relative w-24 h-24">
                        <Image
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-3">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900">{restaurant.name}</h3>
                          <div className="flex items-center text-sm">
                            <span className="text-red-600 font-medium">{restaurant.rating}</span>
                            <span className="ml-1">★</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{restaurant.location}</p>
                        <div className="flex justify-between items-center mt-2">
                          <Heart className="h-4 w-4 fill-red-600 text-red-600" />
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Favorite</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600">No favorites yet</p>
                <Button variant="outline" className="mt-4">
                  <Link href="/nearby">Explore Restaurants</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-40">
        <Link href="/write-review">
          <Button className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg">
            <span className="text-2xl font-bold">+</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
