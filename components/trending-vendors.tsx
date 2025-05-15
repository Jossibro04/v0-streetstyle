"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, ChevronDown, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

const trendingVendors = [
  {
    id: 1,
    name: "Richard's Bake & Shark",
    location: "Maracas Bay",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    description: "Hidden gem serving the most authentic bake and shark with homemade sauces.",
    specialty: "Bake and Shark",
    openHours: "8AM - 5PM",
  },
  {
    id: 2,
    name: "Sauce Doubles",
    location: "Curepe Junction",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    description: "Family-run street food stand with the perfect bara-to-channa ratio.",
    specialty: "Doubles with Slight Pepper",
    openHours: "6AM - 2PM",
  },
  {
    id: 3,
    name: "D'Avenue Corn Soup",
    location: "Port of Spain",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    description: "Late night favorite serving hearty corn soup with homemade dumplings.",
    specialty: "Corn Soup with Dumplings",
    openHours: "6PM - 2AM",
  },
  {
    id: 4,
    name: "Island Grill Jerk Chicken",
    location: "San Fernando",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    description: "Authentic jerk chicken with a secret family recipe passed down generations.",
    specialty: "Jerk Chicken Plate",
    openHours: "11AM - 8PM",
  },
  {
    id: 5,
    name: "Pholourie Paradise",
    location: "Chaguanas",
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=300",
    description: "Underrated spot with the fluffiest pholourie and exceptional tamarind sauce.",
    specialty: "Pholourie with Tamarind Sauce",
    openHours: "10AM - 6PM",
  },
  {
    id: 6,
    name: "Crab & Dumpling Heaven",
    location: "Tobago",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    description: "Local favorite hidden away from tourist spots, serving authentic Tobagonian cuisine.",
    specialty: "Crab and Dumpling",
    openHours: "11AM - 7PM",
  },
]

type FilterOption = "most-popular" | "highest-rated" | "newest" | "hidden-gems"

export default function TrendingVendors() {
  const [filterOption, setFilterOption] = useState<FilterOption>("most-popular")
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  // Adjust number of visible vendors based on screen size
  const [visibleVendors, setVisibleVendors] = useState(1)

  // Update visible vendors count based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleVendors(1) // Mobile: 1 vendor at a time
      } else if (window.innerWidth < 1024) {
        setVisibleVendors(2) // Tablet: 2 vendors at a time
      } else {
        setVisibleVendors(3) // Desktop: 3 vendors at a time
      }
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const filterOptions = [
    { value: "most-popular", label: "Most Popular" },
    { value: "highest-rated", label: "Highest Rated" },
    { value: "newest", label: "Newest Additions" },
    { value: "hidden-gems", label: "Hidden Gems" },
  ]

  const getFilterLabel = () => {
    return filterOptions.find((option) => option.value === filterOption)?.label || "Filter"
  }

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  const totalSlides = Math.ceil(trendingVendors.length / visibleVendors)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Trending Vendors</h2>
            <p className="text-gray-600">Discover hidden and underrated local food spots</p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-gray-700 mr-2">Filter:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-300 transition-transform hover:scale-105">
                  {getFilterLabel()}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {filterOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setFilterOption(option.value as FilterOption)}
                    className={filterOption === option.value ? "bg-red-50 text-red-600" : ""}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="relative">
          <div ref={carouselRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex-shrink-0">
                  <div className="flex flex-row gap-4 overflow-visible">
                    {trendingVendors
                      .slice(slideIndex * visibleVendors, (slideIndex + 1) * visibleVendors)
                      .map((vendor) => (
                        <div key={vendor.id} className="block min-w-[85%] sm:min-w-[48%] md:min-w-[31%] flex-shrink-0">
                          <Card className="bg-white border-gray-200 overflow-hidden hover:border-red-500 hover:shadow-md transition-all duration-300 h-full cursor-pointer">
                            <div className="relative h-48 w-full">
                              <Image
                                src={vendor.image || "/placeholder.svg"}
                                alt={vendor.name}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                                Hidden Gem
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold mt-2">
                                  <Link
                                    href={`/restaurant/${vendor.id}`}
                                    className="hover:text-red-600 transition-colors"
                                  >
                                    {vendor.name}
                                  </Link>
                                </h3>
                                <div className="flex items-center bg-red-700 px-2 py-1 rounded text-sm text-white">
                                  <Star className="h-4 w-4 fill-white text-white mr-1" />
                                  <span>{vendor.rating}</span>
                                </div>
                              </div>
                              <div className="flex items-center text-gray-600 text-sm mb-3">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{vendor.location}</span>
                              </div>
                              <p className="text-gray-700 mb-2">{vendor.description}</p>
                              <div className="mt-2 pt-2 border-t border-gray-100">
                                <p className="text-sm">
                                  <span className="font-medium">Specialty:</span> {vendor.specialty}
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium">Hours:</span> {vendor.openHours}
                                </p>
                              </div>
                            </CardContent>
                            <CardFooter className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                              <Link href={`/restaurant/${vendor.id}`} className="w-full">
                                <Button variant="outline" size="sm" className="w-full text-red-600 hover:bg-red-50">
                                  View Details
                                </Button>
                              </Link>
                            </CardFooter>
                          </Card>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons - more visible on mobile */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-white rounded-full p-2 md:p-3 shadow-md z-10 hover:bg-gray-100 transition-transform hover:scale-105"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-4 bg-white rounded-full p-2 md:p-3 shadow-md z-10 hover:bg-gray-100 transition-transform hover:scale-105"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? "w-8 bg-red-600" : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/spots">
            <Button className="text-red-600 border border-red-600 bg-transparent hover:bg-red-600 hover:text-white transition-colors transition-transform hover:scale-105">
              Explore All Spots
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
