"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Phone, Globe, Heart, Share2, Camera, MessageSquare, ThumbsUp, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import RatingsVisualization from "@/components/ratings-visualization"
import { CustomButton } from "@/components/ui/custom-button"

// Mock data for restaurant details
const restaurantData = {
  id: "richards-bake-and-shark",
  name: "Richard's Bake & Shark",
  rating: 4.8,
  reviewCount: 3546,
  priceRange: "$$",
  cuisine: "Seafood, Street Food",
  address: "Maracas Bay, Trinidad",
  phone: "+1 (868) 555-1234",
  website: "https://richardsbakeandshark.com",
  coordinates: { x: 180, y: 120 },
  hours: [
    { day: "Monday", hours: "10:00 AM - 6:00 PM" },
    { day: "Tuesday", hours: "10:00 AM - 6:00 PM" },
    { day: "Wednesday", hours: "10:00 AM - 6:00 PM" },
    { day: "Thursday", hours: "10:00 AM - 6:00 PM" },
    { day: "Friday", hours: "10:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 7:00 PM" },
    { day: "Sunday", hours: "9:00 AM - 6:00 PM" },
  ],
  description:
    "Richard's Bake & Shark is a legendary food spot located at the beautiful Maracas Bay in Trinidad. Famous for our traditional Bake & Shark sandwiches, we've been serving locals and tourists for over 20 years. Our secret sauce and perfectly fried shark make us a must-visit destination for authentic Trinidadian street food.",
  photos: Array(6).fill("/placeholder.svg?height=400&width=600"),
  ratingDistribution: [5, 12, 25, 45, 30, 15],
  menuItems: [
    { name: "Classic Bake & Shark", price: "$45", description: "Our signature dish with all the traditional toppings" },
    { name: "Spicy Bake & Shark", price: "$50", description: "Kicked up with extra pepper sauce and hot seasonings" },
    {
      name: "Veggie Bake & Mushroom",
      price: "$40",
      description: "Vegetarian option with seasoned mushrooms instead of shark",
    },
    { name: "Fish Sandwich", price: "$40", description: "Made with fresh catch of the day" },
    { name: "Side of Fries", price: "$15", description: "Crispy fries seasoned with our special blend" },
    { name: "Fresh Coconut Water", price: "$10", description: "Straight from the coconut" },
  ],
}

// Mock data for reviews
const reviewsData = [
  {
    id: 1,
    user: {
      name: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100",
      reviewCount: 24,
    },
    rating: 5,
    date: "2 weeks ago",
    content:
      "The best bake and shark I've ever had! The garlic sauce is to die for. The bread was perfectly fried and the shark was tender and flavorful. Highly recommend visiting on a weekday to avoid the crowds.",
    photos: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    user: {
      name: "Anil Kumar",
      avatar: "/placeholder.svg?height=100&width=100",
      reviewCount: 18,
    },
    rating: 4,
    date: "1 month ago",
    content:
      "Great food but the line can get very long on weekends. The bake was perfectly fried and the shark was fresh. I recommend getting all the toppings - the combination is amazing! The location right by the beach makes for a perfect lunch spot.",
    photos: ["/placeholder.svg?height=200&width=300"],
    likes: 16,
    comments: 3,
  },
  {
    id: 3,
    user: {
      name: "Jerome Thomas",
      avatar: "/placeholder.svg?height=100&width=100",
      reviewCount: 42,
    },
    rating: 5,
    date: "2 months ago",
    content:
      "A must-visit when you're in Trinidad! The bake and shark is legendary for a reason. I've been coming here for years and the quality has remained consistent. The condiment bar lets you customize your sandwich exactly how you like it.",
    photos: [],
    likes: 31,
    comments: 5,
  },
]

// Sample review locations for the map
const reviewLocations = [
  { id: 1, name: "Richard's Bake & Shark", location: "Maracas Bay", x: 180, y: 120, count: 24 },
  { id: 2, name: "Sauce Doubles", location: "Curepe Junction", x: 240, y: 200, count: 18 },
  { id: 3, name: "D'Avenue Corn Soup", location: "Port of Spain", x: 200, y: 180, count: 15 },
  { id: 4, name: "Debe Doubles", location: "Debe", x: 280, y: 300, count: 22 },
  { id: 5, name: "San Fernando Roti Shop", location: "San Fernando", x: 250, y: 320, count: 16 },
  { id: 6, name: "Tobago Crab & Dumpling", location: "Scarborough", x: 400, y: 100, count: 19 },
]

export default function RestaurantPage() {
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Restaurant Header - Name and Location at the top */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{restaurantData.name}</h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{restaurantData.address}</span>
                </div>
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <div className="flex mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(restaurantData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-700">
                  {restaurantData.rating} ({restaurantData.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="bg-black py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col">
              <div className="relative h-[400px] md:h-[500px] mb-4 rounded-lg overflow-hidden">
                <Image
                  src={restaurantData.photos[activePhotoIndex] || "/placeholder.svg"}
                  alt={`${restaurantData.name} main photo`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex overflow-x-auto space-x-2 pb-2">
                {restaurantData.photos.map((photo, index) => (
                  <div
                    key={index}
                    className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${
                      activePhotoIndex === index ? "border-red-600" : "border-transparent"
                    }`}
                    onClick={() => setActivePhotoIndex(index)}
                  >
                    <Image
                      src={photo || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white border-b border-gray-200 py-3">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4">
              <CustomButton
                variant={isFavorite ? "default" : "outline"}
                className={isFavorite ? "bg-red-600 hover:bg-red-700" : ""}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`mr-2 h-5 w-5 ${isFavorite ? "fill-white" : ""}`} />
                {isFavorite ? "Saved" : "Save"}
              </CustomButton>
              <CustomButton variant="outline">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </CustomButton>
              <CustomButton variant="outline">
                <Camera className="mr-2 h-5 w-5" />
                Add Photos
              </CustomButton>
              <CustomButton className="bg-red-600 hover:bg-red-700 ml-auto">
                <Link href={`/write-review?restaurant=${restaurantData.id}`}>Write a Review</Link>
              </CustomButton>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="md:col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="menu">Menu</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">About {restaurantData.name}</h3>
                      <p className="text-gray-700 mb-6">{restaurantData.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Location & Contact</h4>
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <MapPin className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                              <span className="text-gray-700">{restaurantData.address}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-5 w-5 text-red-600 mr-3" />
                              <span className="text-gray-700">{restaurantData.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <Globe className="h-5 w-5 text-red-600 mr-3" />
                              <a
                                href={restaurantData.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-600 hover:underline"
                              >
                                Visit Website
                              </a>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Hours of Operation</h4>
                          <div className="space-y-2">
                            {restaurantData.hours.map((item, index) => (
                              <div key={index} className="flex justify-between">
                                <span className="text-gray-700">{item.day}</span>
                                <span className="text-gray-700">{item.hours}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="menu">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Menu</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Popular Items</h4>
                          <div className="space-y-4">
                            {restaurantData.menuItems.map((item, index) => (
                              <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-medium text-gray-900">{item.name}</h5>
                                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                                  </div>
                                  <span className="font-medium text-gray-900">{item.price}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="map">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
                      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm relative">
                        <div className="relative w-full" style={{ height: "500px" }}>
                          {/* Accurate Trinidad and Tobago Map */}
                          <svg viewBox="0 0 500 400" className="w-full h-full">
                            {/* Trinidad */}
                            <path
                              d="M150,150 C180,130 220,130 250,150 C280,170 300,200 320,240 C340,280 330,320 300,340 C270,360 230,350 200,330 C170,310 150,280 130,240 C110,200 120,170 150,150 Z"
                              fill="#f8f8f8"
                              stroke="#e0e0e0"
                              strokeWidth="2"
                            />
                            {/* Tobago */}
                            <path
                              d="M380,80 L450,80 L450,120 L380,120 Z"
                              fill="#f8f8f8"
                              stroke="#e0e0e0"
                              strokeWidth="2"
                            />

                            {/* Location markers */}
                            {reviewLocations.map((loc) => (
                              <g
                                key={loc.id}
                                onClick={() => setSelectedLocation(loc.id === selectedLocation ? null : loc.id)}
                              >
                                <circle
                                  cx={loc.x}
                                  cy={loc.y}
                                  r={selectedLocation === loc.id ? 12 : 8}
                                  fill={selectedLocation === loc.id ? "#ff0000" : "#ff3333"}
                                  className="cursor-pointer transition-all duration-300"
                                />
                                <circle
                                  cx={loc.x}
                                  cy={loc.y}
                                  r={selectedLocation === loc.id ? 18 : 14}
                                  fill="transparent"
                                  stroke={selectedLocation === loc.id ? "#ff0000" : "#ff3333"}
                                  strokeWidth="2"
                                  opacity="0.6"
                                  className="cursor-pointer transition-all duration-300"
                                />
                                {selectedLocation === loc.id && (
                                  <foreignObject
                                    x={loc.x - 100}
                                    y={loc.y - 80}
                                    width="200"
                                    height="60"
                                    className="pointer-events-none"
                                  >
                                    <div className="bg-white p-2 rounded shadow-md text-center">
                                      <p className="font-bold text-sm">{loc.name}</p>
                                      <p className="text-xs text-gray-600">{loc.location}</p>
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

                          {/* Map labels */}
                          <div className="absolute top-4 left-4 text-gray-700 text-sm">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                              <span>Food Locations</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="font-bold text-gray-900 mb-2">Selected Location</h4>
                          {selectedLocation ? (
                            <div>
                              <p className="font-medium">
                                {reviewLocations.find((loc) => loc.id === selectedLocation)?.name}
                              </p>
                              <p className="text-gray-600">
                                {reviewLocations.find((loc) => loc.id === selectedLocation)?.location}
                              </p>
                            </div>
                          ) : (
                            <p className="text-gray-600">Click on a marker to see details</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-gray-900">Reviews</h3>
                      <CustomButton className="bg-red-600 hover:bg-red-700">
                        <Link href={`/write-review?restaurant=${restaurantData.id}`}>Write a Review</Link>
                      </CustomButton>
                    </div>

                    {reviewsData.map((review) => (
                      <Card key={review.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <Image
                                src={review.user.avatar || "/placeholder.svg"}
                                alt={review.user.name}
                                width={50}
                                height={50}
                                className="rounded-full"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <div>
                                  <h4 className="font-bold text-gray-900">{review.user.name}</h4>
                                  <p className="text-gray-600 text-sm">{review.user.reviewCount} reviews</p>
                                </div>
                                <div className="flex items-center mt-2 sm:mt-0">
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                                </div>
                              </div>
                              <p className="text-gray-700 mt-3">{review.content}</p>

                              {review.photos.length > 0 && (
                                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                                  {review.photos.map((photo, index) => (
                                    <div
                                      key={index}
                                      className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden"
                                    >
                                      <Image
                                        src={photo || "/placeholder.svg"}
                                        alt="Review photo"
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="flex gap-4 mt-4">
                                <CustomButton variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  <span>Helpful ({review.likes})</span>
                                </CustomButton>
                                <CustomButton variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  <span>Comment ({review.comments})</span>
                                </CustomButton>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <div className="text-center">
                      <CustomButton variant="outline">Load More Reviews</CustomButton>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Business Info Card and Ratings Visualization */}
            <div className="md:col-span-1">
              <div className="space-y-6 sticky top-20">
                {/* Ratings Visualization */}
                <RatingsVisualization
                  averageRating={restaurantData.rating}
                  totalRatings={restaurantData.reviewCount}
                  ratingDistribution={restaurantData.ratingDistribution}
                />

                {/* Business Info Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Business Info</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Address</h4>
                        <div className="flex items-start mt-1">
                          <MapPin className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                          <span className="text-gray-900">{restaurantData.address}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Phone</h4>
                        <div className="flex items-center mt-1">
                          <Phone className="h-5 w-5 text-red-600 mr-2" />
                          <span className="text-gray-900">{restaurantData.phone}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Website</h4>
                        <div className="flex items-center mt-1">
                          <Globe className="h-5 w-5 text-red-600 mr-2" />
                          <a
                            href={restaurantData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:underline truncate"
                          >
                            {restaurantData.website.replace("https://", "")}
                          </a>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Hours</h4>
                        <div className="mt-1 space-y-1">
                          {restaurantData.hours.slice(0, 3).map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-700">{item.day}</span>
                              <span className="text-gray-900">{item.hours}</span>
                            </div>
                          ))}
                          <CustomButton variant="ghost" size="sm" className="text-red-600 p-0 h-auto">
                            See all hours
                          </CustomButton>
                        </div>
                      </div>

                      <div className="pt-2">
                        <CustomButton className="w-full bg-red-600 hover:bg-red-700">
                          <Link href={`/write-review?restaurant=${restaurantData.id}`}>Write a Review</Link>
                        </CustomButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-red-600 mr-2" />
                          <span className="text-gray-700">Average Visit Time</span>
                        </div>
                        <span className="font-medium">45 min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-red-600 mr-2" />
                          <span className="text-gray-700">Most Common Rating</span>
                        </div>
                        <span className="font-medium">5 stars</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <ThumbsUp className="h-5 w-5 text-red-600 mr-2" />
                          <span className="text-gray-700">Recommended Dish</span>
                        </div>
                        <span className="font-medium">Bake & Shark</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
