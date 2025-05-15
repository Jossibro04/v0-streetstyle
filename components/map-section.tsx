"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { MapPin, Search, Filter, Navigation, Loader } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

// Sample vendor locations
const vendorLocations = [
  {
    id: 1,
    name: "Richard's Bake & Shark",
    location: "Maracas Bay",
    x: 180,
    y: 120,
    count: 24,
    type: "Seafood",
    lat: 10.7512,
    lng: -61.1542,
  },
  {
    id: 2,
    name: "Sauce Doubles",
    location: "Curepe Junction",
    x: 240,
    y: 200,
    count: 18,
    type: "Street Food",
    lat: 10.6385,
    lng: -61.4097,
  },
  {
    id: 3,
    name: "D'Avenue Corn Soup",
    location: "Port of Spain",
    x: 200,
    y: 180,
    count: 15,
    type: "Soup",
    lat: 10.6573,
    lng: -61.518,
  },
  {
    id: 4,
    name: "Debe Doubles",
    location: "Debe",
    x: 280,
    y: 300,
    count: 22,
    type: "Street Food",
    lat: 10.2082,
    lng: -61.4467,
  },
  {
    id: 5,
    name: "San Fernando Roti Shop",
    location: "San Fernando",
    x: 250,
    y: 320,
    count: 16,
    type: "Indian",
    lat: 10.2799,
    lng: -61.4678,
  },
  {
    id: 6,
    name: "Tobago Crab & Dumpling",
    location: "Scarborough",
    x: 400,
    y: 100,
    count: 19,
    type: "Seafood",
    lat: 11.1871,
    lng: -60.7399,
  },
  {
    id: 7,
    name: "Piarco Pholourie",
    location: "Piarco",
    x: 220,
    y: 160,
    count: 12,
    type: "Snack",
    lat: 10.5953,
    lng: -61.3372,
  },
  {
    id: 8,
    name: "Mayaro Fish Fry",
    location: "Mayaro",
    x: 350,
    y: 280,
    count: 14,
    type: "Seafood",
    lat: 10.2406,
    lng: -61.0075,
  },
  {
    id: 9,
    name: "Toco Shark & Bake",
    location: "Toco",
    x: 380,
    y: 150,
    count: 10,
    type: "Seafood",
    lat: 10.8326,
    lng: -60.9564,
  },
]

export default function MapSection() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLocating, setIsLocating] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearbyVendors, setNearbyVendors] = useState<typeof vendorLocations>([])
  const { t } = useLanguage()

  // Filter locations based on search query
  const filteredLocations = vendorLocations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Function to find user's location
  const findMyLocation = () => {
    setIsLocating(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          setUserLocation({ lat: userLat, lng: userLng })

          // Find nearby vendors (simplified calculation)
          const nearby = vendorLocations
            .map((vendor) => {
              const distance = calculateDistance(userLat, userLng, vendor.lat, vendor.lng)
              return { ...vendor, distance }
            })
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3) // Get 3 closest vendors

          setNearbyVendors(nearby)
          toast({
            title: "Location found!",
            description: "We've found the closest food spots near you.",
          })
          setIsLocating(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          toast({
            title: "Location error",
            description: "Unable to find your location. Please try again.",
            variant: "destructive",
          })
          setIsLocating(false)
        },
      )
    } else {
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      })
      setIsLocating(false)
    }
  }

  // Simple distance calculation (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
  }

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Discover Hidden Food Spots</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our interactive map to find underrated local vendors and hidden culinary gems across Trinidad and
            Tobago
          </p>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2 max-w-3xl mx-auto">
            <div className="relative flex-1 min-w-[250px]">
              <Input
                placeholder="Search for spots, locations, or cuisine types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <Button variant="outline" className="flex-shrink-0 h-12">
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </Button>
            <Button
              variant="outline"
              className="flex-shrink-0 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 h-12"
              onClick={findMyLocation}
              disabled={isLocating}
            >
              {isLocating ? <Loader className="h-5 w-5 mr-2 animate-spin" /> : <Navigation className="h-5 w-5 mr-2" />}
              Find My Location
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg p-4 border border-gray-200 shadow-sm relative">
            <div className="relative w-full" style={{ height: "600px" }}>
              {/* Enhanced SVG map of Trinidad and Tobago */}
              <svg viewBox="0 0 500 400" className="w-full h-full">
                {/* Trinidad */}
                <path
                  d="M150,150 C180,130 220,130 250,150 C280,170 300,200 320,240 C340,280 330,320 300,340 C270,360 230,350 200,330 C170,310 150,280 130,240 C110,200 120,170 150,150 Z"
                  fill="#f8f8f8"
                  stroke="#e0e0e0"
                  strokeWidth="2"
                />
                {/* Tobago */}
                <path d="M380,80 L450,80 L450,120 L380,120 Z" fill="#f8f8f8" stroke="#e0e0e0" strokeWidth="2" />

                {/* User location marker if available */}
                {userLocation && (
                  <g className="animate-pulse">
                    <circle
                      cx={250} // Simplified - in a real app, would convert lat/lng to x,y coordinates
                      cy={200}
                      r={10}
                      fill="blue"
                      opacity="0.7"
                    />
                    <circle cx={250} cy={200} r={20} fill="transparent" stroke="blue" strokeWidth="2" opacity="0.3" />
                  </g>
                )}

                {/* Location markers */}
                {filteredLocations.map((loc) => (
                  <g
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc.id === selectedLocation ? null : loc.id)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={loc.x}
                      cy={loc.y}
                      r={selectedLocation === loc.id ? 12 : 8}
                      fill={
                        nearbyVendors.some((v) => v.id === loc.id)
                          ? "#ff9900"
                          : selectedLocation === loc.id
                            ? "#ff0000"
                            : "#ff3333"
                      }
                      className="transition-all duration-300"
                    />
                    <circle
                      cx={loc.x}
                      cy={loc.y}
                      r={selectedLocation === loc.id ? 18 : 14}
                      fill="transparent"
                      stroke={
                        nearbyVendors.some((v) => v.id === loc.id)
                          ? "#ff9900"
                          : selectedLocation === loc.id
                            ? "#ff0000"
                            : "#ff3333"
                      }
                      strokeWidth="2"
                      opacity="0.6"
                      className="transition-all duration-300"
                    />
                    {selectedLocation === loc.id && (
                      <foreignObject
                        x={loc.x - 100}
                        y={loc.y - 80}
                        width="200"
                        height="80"
                        className="pointer-events-none"
                      >
                        <div className="bg-white p-3 rounded shadow-md text-center">
                          <p className="font-bold text-sm">{loc.name}</p>
                          <p className="text-xs text-gray-600">{loc.location}</p>
                          <p className="text-xs text-red-600 mt-1">
                            {loc.type} • {loc.count} visitors
                          </p>
                        </div>
                      </foreignObject>
                    )}
                  </g>
                ))}

                {/* Map labels */}
                <text x="220" y="240" className="text-lg font-bold" fill="#333">
                  Trinidad
                </text>
                <text x="415" y="100" className="text-lg font-bold" fill="#333">
                  Tobago
                </text>
              </svg>

              {/* Map legend */}
              <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                  <span className="text-sm">Food Spots</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4">
              <Link href="/map">
                <Button className="bg-red-600 hover:bg-red-700 shadow-md">View Full Map</Button>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Hidden Gems</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {nearbyVendors.length > 0 ? (
                <>
                  <h4 className="font-medium text-orange-600">Spots Near You</h4>
                  {nearbyVendors.map((loc) => (
                    <Card
                      key={loc.id}
                      className="bg-white border-orange-300 border-2 hover:border-orange-500 cursor-pointer transition-all"
                      onClick={() => setSelectedLocation(loc.id === selectedLocation ? null : loc.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900">{loc.name}</h4>
                            <div className="flex items-center text-gray-600 text-sm">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{loc.location}</span>
                            </div>
                            <p className="text-xs text-orange-600 mt-1">
                              {loc.distance.toFixed(1)} km away • {loc.type}
                            </p>
                          </div>
                          <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded h-fit text-sm">Nearby</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="border-t border-gray-200 my-4"></div>
                </>
              ) : null}

              {filteredLocations.map((loc) => (
                <Card
                  key={loc.id}
                  className={`bg-white border-gray-200 hover:border-red-500 cursor-pointer transition-all ${
                    selectedLocation === loc.id ? "border-red-600 shadow-md" : ""
                  }`}
                  onClick={() => setSelectedLocation(loc.id === selectedLocation ? null : loc.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{loc.name}</h4>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{loc.location}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{loc.type}</p>
                      </div>
                      <div className="bg-red-100 text-red-600 px-2 py-1 rounded h-fit text-sm">
                        {loc.count} visitors
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100 flex justify-end">
                      <Link href={`/vendor/${loc.id}`}>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/spots">
                <Button className="bg-red-600 hover:bg-red-700">View All Food Spots</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
