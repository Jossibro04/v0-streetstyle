"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, MapPin, Navigation, Search, Star, X } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"

// Mock data for food spots
const foodSpots = [
  {
    id: "spot1",
    name: "Richard's Bake & Shark",
    location: "Maracas Bay",
    description: "Famous for their bake and shark sandwiches with various toppings and sauces.",
    rating: 4.8,
    price: "$$",
    cuisine: "Seafood",
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 10.7542, lng: -61.5654 },
    features: ["Seating Available", "Takeout", "Hidden Gem"],
  },
  {
    id: "spot2",
    name: "Sauce Doubles",
    location: "Curepe Junction",
    description: "Authentic Trinidadian street food featuring bara and channa.",
    rating: 4.7,
    price: "$",
    cuisine: "Street Food",
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 10.6389, lng: -61.4097 },
    features: ["Takeout", "Hidden Gem"],
  },
  {
    id: "spot3",
    name: "Island Grill Jerk Chicken",
    location: "San Fernando",
    description: "Spicy jerk chicken with Caribbean sides and flavors.",
    rating: 4.5,
    price: "$$",
    cuisine: "BBQ",
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 10.2797, lng: -61.4683 },
    features: ["Seating Available", "Takeout", "Parking"],
  },
  {
    id: "spot4",
    name: "Curry House",
    location: "Chaguanas",
    description: "Authentic Indian and Indo-Caribbean cuisine with a focus on curry dishes.",
    rating: 4.6,
    price: "$$",
    cuisine: "Indian",
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 10.5158, lng: -61.4127 },
    features: ["Seating Available", "Takeout", "Parking"],
  },
  {
    id: "spot5",
    name: "Creole Kitchen",
    location: "Port of Spain",
    description: "Traditional Trinidadian creole dishes with a modern twist.",
    rating: 4.4,
    price: "$$",
    cuisine: "Creole",
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 10.6572, lng: -61.518 },
    features: ["Seating Available", "Takeout", "Hidden Gem"],
  },
]

// Filter options
const cuisineOptions = ["All", "Seafood", "Street Food", "BBQ", "Indian", "Creole", "Chinese", "Italian"]
const locationOptions = [
  "All",
  "Port of Spain",
  "San Fernando",
  "Chaguanas",
  "Maracas Bay",
  "Curepe Junction",
  "Tobago",
]
const priceOptions = ["All", "$", "$$", "$$$"]
const featureOptions = ["Seating Available", "Takeout", "Parking", "Hidden Gem"]

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [selectedPrice, setSelectedPrice] = useState("All")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [ratingFilter, setRatingFilter] = useState([0])
  const [filteredSpots, setFilteredSpots] = useState(foodSpots)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  const [searchType, setSearchType] = useState<"cuisine" | "location">("cuisine")

  // Filter spots based on selected filters
  useEffect(() => {
    let filtered = foodSpots

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (spot) =>
          spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          spot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          spot.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by cuisine
    if (selectedCuisine !== "All") {
      filtered = filtered.filter((spot) => spot.cuisine === selectedCuisine)
    }

    // Filter by location
    if (selectedLocation !== "All") {
      filtered = filtered.filter((spot) => spot.location === selectedLocation)
    }

    // Filter by price
    if (selectedPrice !== "All") {
      filtered = filtered.filter((spot) => spot.price === selectedPrice)
    }

    // Filter by features
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter((spot) => selectedFeatures.every((feature) => spot.features.includes(feature)))
    }

    // Filter by rating
    if (ratingFilter[0] > 0) {
      filtered = filtered.filter((spot) => spot.rating >= ratingFilter[0])
    }

    setFilteredSpots(filtered)
  }, [searchQuery, selectedCuisine, selectedLocation, selectedPrice, selectedFeatures, ratingFilter])

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Get user location
  const getUserLocation = () => {
    setIsLocating(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setIsLocating(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLocating(false)
        },
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
      setIsLocating(false)
    }
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCuisine("All")
    setSelectedLocation("All")
    setSelectedPrice("All")
    setSelectedFeatures([])
    setRatingFilter([0])
  }

  // Toggle feature selection
  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Food Spot Map</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={getUserLocation}
                disabled={isLocating}
              >
                {isLocating ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-red-600" />
                ) : (
                  <Navigation className="h-4 w-4" />
                )}
                <span>My Location</span>
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                    {selectedCuisine !== "All" ||
                    selectedLocation !== "All" ||
                    selectedPrice !== "All" ||
                    selectedFeatures.length > 0 ||
                    ratingFilter[0] > 0 ? (
                      <Badge className="ml-1 bg-red-600 hover:bg-red-700">
                        {(selectedCuisine !== "All" ? 1 : 0) +
                          (selectedLocation !== "All" ? 1 : 0) +
                          (selectedPrice !== "All" ? 1 : 0) +
                          selectedFeatures.length +
                          (ratingFilter[0] > 0 ? 1 : 0)}
                      </Badge>
                    ) : null}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filter Food Spots</SheetTitle>
                    <SheetDescription>Refine your search to find exactly what you're looking for</SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Search By</h3>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant={searchType === "cuisine" ? "default" : "outline"}
                          className={searchType === "cuisine" ? "bg-red-600 hover:bg-red-700" : "hover:bg-red-50"}
                          size="sm"
                          onClick={() => setSearchType("cuisine")}
                        >
                          Cuisine
                        </Button>
                        <Button
                          variant={searchType === "location" ? "default" : "outline"}
                          className={searchType === "location" ? "bg-red-600 hover:bg-red-700" : "hover:bg-red-50"}
                          size="sm"
                          onClick={() => setSearchType("location")}
                        >
                          Location
                        </Button>
                      </div>
                    </div>

                    {searchType === "cuisine" ? (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium">Cuisine Type</h3>
                          {selectedCuisine !== "All" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-xs"
                              onClick={() => setSelectedCuisine("All")}
                            >
                              Reset
                            </Button>
                          )}
                        </div>
                        <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select cuisine" />
                          </SelectTrigger>
                          <SelectContent>
                            {cuisineOptions.map((cuisine) => (
                              <SelectItem key={cuisine} value={cuisine}>
                                {cuisine}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium">Location</h3>
                          {selectedLocation !== "All" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-xs"
                              onClick={() => setSelectedLocation("All")}
                            >
                              Reset
                            </Button>
                          )}
                        </div>
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locationOptions.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Price Range</h3>
                        {selectedPrice !== "All" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={() => setSelectedPrice("All")}
                          >
                            Reset
                          </Button>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {priceOptions.map((price) => (
                          <Button
                            key={price}
                            variant={selectedPrice === price ? "default" : "outline"}
                            className={selectedPrice === price ? "bg-red-600 hover:bg-red-700" : "hover:bg-red-50"}
                            size="sm"
                            onClick={() => setSelectedPrice(price)}
                          >
                            {price}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Minimum Rating</h3>
                        {ratingFilter[0] > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={() => setRatingFilter([0])}
                          >
                            Reset
                          </Button>
                        )}
                      </div>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0]}
                          max={5}
                          step={0.5}
                          value={ratingFilter}
                          onValueChange={setRatingFilter}
                          className="py-4"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Any</span>
                          <span>{ratingFilter[0]} ★ & Up</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Features</h3>
                        {selectedFeatures.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={() => setSelectedFeatures([])}
                          >
                            Reset
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {featureOptions.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                              id={`feature-${feature}`}
                              checked={selectedFeatures.includes(feature)}
                              onCheckedChange={() => toggleFeature(feature)}
                            />
                            <label
                              htmlFor={`feature-${feature}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {feature}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <Button variant="outline" onClick={resetFilters}>
                        Reset All
                      </Button>
                      <Button className="bg-red-600 hover:bg-red-700">Apply Filters</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="relative mb-6">
            <Input
              type="text"
              placeholder="Search for food spots by name, location, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-6 text-base"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Container */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-[600px] bg-gray-100">
                    {!isMapLoaded ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-red-600"></div>
                      </div>
                    ) : (
                      <div className="h-full w-full bg-blue-50 relative">
                        {/* This would be replaced with an actual map component */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <MapPin className="h-12 w-12 text-red-600 mx-auto" />
                            <p className="mt-2 text-gray-700">
                              Interactive map would be displayed here with {filteredSpots.length} spots
                            </p>
                            {userLocation && (
                              <p className="text-sm text-gray-600 mt-2">
                                Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Map pins for each spot */}
                        {filteredSpots.map((spot) => (
                          <div
                            key={spot.id}
                            className="absolute"
                            style={{
                              left: `${Math.random() * 80 + 10}%`,
                              top: `${Math.random() * 80 + 10}%`,
                            }}
                          >
                            <div className="relative group">
                              <MapPin className="h-6 w-6 text-red-600 fill-red-600" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white shadow-lg rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <p className="font-medium text-sm">{spot.name}</p>
                                <p className="text-xs text-gray-600">{spot.location}</p>
                                <div className="flex items-center mt-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="ml-1 text-xs">{spot.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">
                    {filteredSpots.length} {filteredSpots.length === 1 ? "Result" : "Results"}
                  </h2>
                </div>
                <div className="divide-y max-h-[550px] overflow-y-auto">
                  {filteredSpots.length > 0 ? (
                    filteredSpots.map((spot) => (
                      <div key={spot.id} className="p-4 hover:bg-gray-50">
                        <Link href={`/restaurant/${spot.id}`} className="block">
                          <div className="flex gap-3">
                            <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                              <Image
                                src={spot.image || "/placeholder.svg"}
                                alt={spot.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{spot.name}</h3>
                              <p className="text-sm text-gray-600">{spot.location}</p>
                              <div className="flex items-center mt-1">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="ml-1 text-sm">{spot.rating}</span>
                                </div>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-gray-600">{spot.price}</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-gray-600">{spot.cuisine}</span>
                              </div>
                              {spot.features.includes("Hidden Gem") && (
                                <Badge className="mt-2 bg-red-100 text-red-800 hover:bg-red-200">Hidden Gem</Badge>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-500">No food spots match your filters.</p>
                      <Button variant="link" className="mt-2 text-red-600 hover:text-red-700" onClick={resetFilters}>
                        Reset all filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
