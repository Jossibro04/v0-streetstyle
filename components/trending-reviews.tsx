"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

const trendingReviews = [
  {
    id: 1,
    title: "Richard's Bake & Shark",
    location: "Maracas Bay",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    review: "The best bake and shark I've ever had! The garlic sauce is to die for.",
    author: "Maria S.",
    date: "2 days ago",
  },
  {
    id: 2,
    title: "Sauce Doubles",
    location: "Curepe Junction",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    review: "Perfect balance of spicy and savory. The bara is so soft!",
    author: "Anil K.",
    date: "5 days ago",
  },
  {
    id: 3,
    title: "D'Avenue Corn Soup",
    location: "Port of Spain",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    review: "Thick, hearty and full of flavor. A must-try on a rainy evening.",
    author: "Jerome T.",
    date: "1 week ago",
  },
  {
    id: 4,
    title: "Island Grill Jerk Chicken",
    location: "San Fernando",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    review: "Perfectly spiced and grilled to perfection. The sides are amazing too!",
    author: "Lisa R.",
    date: "3 days ago",
  },
  {
    id: 5,
    title: "Pholourie Paradise",
    location: "Chaguanas",
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=300",
    review: "The best pholourie in Trinidad! The tamarind sauce is exceptional.",
    author: "Ravi M.",
    date: "1 week ago",
  },
  {
    id: 6,
    title: "Crab & Dumpling Heaven",
    location: "Tobago",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    review: "A Tobago specialty that's worth the trip! Fresh seafood and perfect dumplings.",
    author: "Cheryl A.",
    date: "4 days ago",
  },
]

type FilterOption = "most-rated" | "highest-rated" | "newest" | "oldest"

export default function TrendingReviews() {
  const [filterOption, setFilterOption] = useState<FilterOption>("most-rated")
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  // Adjust number of visible reviews based on screen size
  const [visibleReviews, setVisibleReviews] = useState(1)

  // Update visible reviews count based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleReviews(1) // Mobile: 1 review at a time
      } else if (window.innerWidth < 1024) {
        setVisibleReviews(2) // Tablet: 2 reviews at a time
      } else {
        setVisibleReviews(3) // Desktop: 3 reviews at a time
      }
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const filterOptions = [
    { value: "most-rated", label: t("trending.most_rated") },
    { value: "highest-rated", label: t("trending.highest_rated") },
    { value: "newest", label: t("trending.newest") },
    { value: "oldest", label: t("trending.oldest") },
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

  const totalSlides = Math.ceil(trendingReviews.length / visibleReviews)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  // Function to translate date strings
  const translateDate = (dateStr: string) => {
    if (dateStr.includes("days")) {
      return dateStr.replace("days ago", t("trending.days_ago"))
    } else if (dateStr.includes("week")) {
      return dateStr.replace("week ago", t("trending.weeks_ago")).replace("weeks ago", t("trending.weeks_ago"))
    } else if (dateStr.includes("month")) {
      return dateStr.replace("month ago", t("trending.months_ago")).replace("months ago", t("trending.months_ago"))
    }
    return dateStr
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">{t("trending.title")}</h2>
            <p className="text-gray-600">{t("trending.subtitle")}</p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-gray-700 mr-2">{t("trending.sort")}</span>
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
                    {trendingReviews
                      .slice(slideIndex * visibleReviews, (slideIndex + 1) * visibleReviews)
                      .map((review) => (
                        <Link
                          href={`/restaurant/${review.id}`}
                          key={review.id}
                          className="block min-w-[85%] sm:min-w-[48%] md:min-w-[31%] flex-shrink-0"
                        >
                          <Card className="bg-white border-gray-200 overflow-hidden hover:border-red-500 hover:shadow-md transition-all duration-300 h-full cursor-pointer">
                            <div className="relative h-48 w-full">
                              <Image
                                src={review.image || "/placeholder.svg"}
                                alt={review.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{review.title}</h3>
                                <div className="flex items-center bg-red-700 px-2 py-1 rounded text-sm text-white">
                                  <Star className="h-4 w-4 fill-white text-white mr-1" />
                                  <span>{review.rating}</span>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm mb-3">{review.location}</p>
                              <p className="text-gray-700">{review.review}</p>
                            </CardContent>
                            <CardFooter className="px-4 py-3 border-t border-gray-200 text-sm text-gray-600">
                              <span>{review.author}</span>
                              <span className="ml-auto">{translateDate(review.date)}</span>
                            </CardFooter>
                          </Card>
                        </Link>
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
          <Link href="/reviews">
            <button className="text-red-600 border border-red-600 px-6 py-2 rounded-md hover:bg-red-600 hover:text-white transition-colors transition-transform hover:scale-105">
              {t("trending.view_all")}
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
