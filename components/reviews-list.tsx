"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MessageSquare, Heart, Filter, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/utils/language-utils"

// Review type
interface Review {
  id: number
  title: string
  restaurantName: string
  location: string
  rating: number
  content: string
  image: string
  author: {
    name: string
    avatar: string
  }
  date: Date
  likes: number
  comments: number
  cuisine: string
  tags: string[]
}

// Filter type
type FilterOption = "newest" | "highest-rated" | "most-liked" | "most-commented"
type CuisineFilter =
  | "all"
  | "trinidadian"
  | "tobagonian"
  | "indian"
  | "chinese"
  | "creole"
  | "bbq"
  | "seafood"
  | "street-food"

export default function ReviewsList() {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState("all")
  const [filterOption, setFilterOption] = useState<FilterOption>("newest")
  const [cuisineFilter, setCuisineFilter] = useState<CuisineFilter>("all")
  const [currentPage, setCurrentPage] = useState(1)

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: 1,
      title: "The best bake and shark I've ever had!",
      restaurantName: "Richard's Bake & Shark",
      location: "Maracas Bay",
      rating: 4.8,
      content:
        "The best bake and shark I've ever had! The garlic sauce is to die for. The bread was perfectly fried and the shark was tender and flavorful. Highly recommend visiting on a weekday to avoid the crowds.",
      image: "/placeholder.svg?height=300&width=500",
      author: {
        name: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: new Date(2023, 10, 15),
      likes: 42,
      comments: 8,
      cuisine: "seafood",
      tags: ["beach", "seafood", "local-favorite"],
    },
    {
      id: 2,
      title: "Perfect balance of spicy and savory",
      restaurantName: "Sauce Doubles",
      location: "Curepe Junction",
      rating: 4.7,
      content:
        "Perfect balance of spicy and savory. The bara is so soft! I always get mine with slight pepper and extra chadon beni. The vendor is very friendly and the line moves quickly even when it's long.",
      image: "/placeholder.svg?height=300&width=500",
      author: {
        name: "Anil Kumar",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: new Date(2023, 10, 10),
      likes: 36,
      comments: 5,
      cuisine: "trinidadian",
      tags: ["breakfast", "street-food", "vegetarian"],
    },
    {
      id: 3,
      title: "Thick, hearty and full of flavor",
      restaurantName: "D'Avenue Corn Soup",
      location: "Port of Spain",
      rating: 4.5,
      content:
        "Thick, hearty and full of flavor. A must-try on a rainy evening. The dumplings are perfectly cooked and the corn is always fresh. I love how they add a bit of pumpkin to thicken the soup.",
      image: "/placeholder.svg?height=300&width=500",
      author: {
        name: "Jerome Thomas",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: new Date(2023, 10, 5),
      likes: 28,
      comments: 3,
      cuisine: "trinidadian",
      tags: ["soup", "comfort-food", "rainy-day"],
    },
    {
      id: 4,
      title: "Perfectly spiced and grilled to perfection",
      restaurantName: "Island Grill Jerk Chicken",
      location: "San Fernando",
      rating: 4.6,
      content:
        "Perfectly spiced and grilled to perfection. The sides are amazing too! Their rice and peas complement the jerk chicken perfectly, and don't miss out on their plantains. Great value for money.",
      image: "/placeholder.svg?height=300&width=500",
      author: {
        name: "Lisa R.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: new Date(2023, 9, 28),
      likes: 32,
      comments: 6,
      cuisine: "bbq",
      tags: ["chicken", "spicy", "dinner"],
    },
    {
      id: 5,
      title: "The best pholourie in Trinidad!",
      restaurantName: "Pholourie Paradise",
      location: "Chaguanas",
      rating: 4.4,
      content:
        "The best pholourie in Trinidad! The tamarind sauce is exceptional. The pholourie balls are perfectly spiced and not too oily. Great snack for on-the-go or to share with friends.",
      image: "/placeholder.svg?height=300&width=500",
      author: {
        name: "Ravi M.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: new Date(2023, 9, 20),
      likes: 24,
      comments: 4,
      cuisine: "indian",
      tags: ["snack", "vegetarian", "street-food"],
    },
    {
      id: 6,
      title: "A Tobago specialty that's worth the trip!",
      restaurantName: "Crab & Dumpling Heaven",
      location: "Scarborough, Tobago",
      rating: 4.9,
      content:
        "A Tobago specialty that's worth the trip! Fresh seafood and perfect dumplings. The crab is always fresh and well-seasoned. The curry sauce is rich and flavorful. A must-try when visiting Tobago!",
      image: "/placeholder.svg?height=300&width=500",
      author: {
        name: "Cheryl A.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: new Date(2023, 9, 15),
      likes: 45,
      comments: 9,
      cuisine: "tobagonian",
      tags: ["seafood", "curry", "local-specialty"],
    },
    {
      id: 7,
      title: "Authentic Chinese flavors with a Trini twist",
      restaurantName: "Golden Dragon",
      location: "Port of Spain",
      rating: 4.3,
      content:
        "Authentic Chinese flavors with a Trini twist. Their wontons are amazing and the chow mein has the perfect balance of flavors. Great portion sizes and friendly service. Highly recommend for lunch!",
      image: "/placeholder.svg?height=300&width=500",
      author: {
        name: "Michael C.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: new Date(2023, 9, 8),
      likes: 19,
      comments: 3,
      cuisine: "chinese",
      tags: ["fusion", "lunch", "takeout"],
    },
    {
      id: 8,
      title: "The best roti in south Trinidad",
      restaurantName: "Roti Masters",
      location: "San Fernando",
      rating: 4.7,
      content:
        "The best roti in south Trinidad! The dhalpuri is soft and flaky, and the curry chicken is perfectly seasoned. They don't skimp on the fillings either. Worth the drive from Port of Spain!",
      image: "/placeholder.svg?height=300&width=500",
      author: {
        name: "Sarah J.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      date: new Date(2023, 9, 1),
      likes: 38,
      comments: 7,
      cuisine: "indian",
      tags: ["roti", "curry", "lunch"],
    },
  ]

  // Filter options
  const filterOptions = [
    { value: "newest", label: t("reviews.filters.newest") },
    { value: "highest-rated", label: t("reviews.filters.highest_rated") },
    { value: "most-liked", label: t("reviews.filters.most_liked") },
    { value: "most-commented", label: t("reviews.filters.most_commented") },
  ]

  // Cuisine options
  const cuisineOptions = [
    { value: "all", label: t("reviews.cuisines.all") },
    { value: "trinidadian", label: t("reviews.cuisines.trinidadian") },
    { value: "tobagonian", label: t("reviews.cuisines.tobagonian") },
    { value: "indian", label: t("reviews.cuisines.indian") },
    { value: "chinese", label: t("reviews.cuisines.chinese") },
    { value: "creole", label: t("reviews.cuisines.creole") },
    { value: "bbq", label: t("reviews.cuisines.bbq") },
    { value: "seafood", label: t("reviews.cuisines.seafood") },
    { value: "street-food", label: t("reviews.cuisines.street_food") },
  ]

  // Filter reviews based on active tab, cuisine filter, and sort option
  const filteredReviews = reviews
    .filter((review) => {
      if (activeTab === "all") return true
      if (activeTab === "top-rated") return review.rating >= 4.5
      if (activeTab === "recent") return new Date().getTime() - review.date.getTime() < 7 * 24 * 60 * 60 * 1000 // 7 days
      return true
    })
    .filter((review) => {
      if (cuisineFilter === "all") return true
      return review.cuisine === cuisineFilter
    })
    .sort((a, b) => {
      if (filterOption === "newest") return b.date.getTime() - a.date.getTime()
      if (filterOption === "highest-rated") return b.rating - a.rating
      if (filterOption === "most-liked") return b.likes - a.likes
      if (filterOption === "most-commented") return b.comments - a.comments
      return 0
    })

  // Pagination
  const reviewsPerPage = 4
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage)
  const paginatedReviews = filteredReviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">{t("reviews.tabs.all")}</TabsTrigger>
                <TabsTrigger value="top-rated">{t("reviews.tabs.top_rated")}</TabsTrigger>
                <TabsTrigger value="recent">{t("reviews.tabs.recent")}</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col sm:flex-row gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    {cuisineOptions.find((option) => option.value === cuisineFilter)?.label}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium text-gray-500">{t("reviews.filter_by_cuisine")}</div>
                  {cuisineOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      className={cuisineFilter === option.value ? "bg-red-50 text-red-600" : ""}
                      onClick={() => setCuisineFilter(option.value as CuisineFilter)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    {t("reviews.sort_by")}:{" " + filterOptions.find((option) => option.value === filterOption)?.label}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {filterOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      className={filterOption === option.value ? "bg-red-50 text-red-600" : ""}
                      onClick={() => setFilterOption(option.value as FilterOption)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Reviews Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredReviews.length} {t("reviews.results")}
          </h2>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {paginatedReviews.length > 0 ? (
            paginatedReviews.map((review) => (
              <Card key={review.id} className="overflow-hidden hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative h-64 md:h-auto">
                    <Image src={review.image || "/placeholder.svg"} alt={review.title} fill className="object-cover" />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link href={`/restaurant/${review.id}`} className="hover:text-red-600 transition">
                          <h3 className="text-xl font-bold text-gray-900">{review.restaurantName}</h3>
                        </Link>
                        <p className="text-gray-600 text-sm">{review.location}</p>
                      </div>
                      <div className="flex items-center bg-red-100 text-red-600 px-2 py-1 rounded">
                        <Star className="h-4 w-4 fill-red-600 text-red-600 mr-1" />
                        <span>{review.rating}</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold mt-3 text-gray-800">{review.title}</h4>
                    <p className="text-gray-700 mt-2 line-clamp-3">{review.content}</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {review.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center">
                        <Image
                          src={review.author.avatar || "/placeholder.svg"}
                          alt={review.author.name}
                          width={32}
                          height={32}
                          className="rounded-full mr-2"
                        />
                        <span className="text-gray-700 text-sm font-medium">{review.author.name}</span>
                      </div>
                      <span className="text-gray-500 text-sm ml-auto">{formatDate(review.date, language)}</span>
                    </div>

                    <div className="flex gap-4 mt-4">
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{review.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{review.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 ml-auto">
                        <Link href={`/reviews/${review.id}`}>{t("reviews.read_more")}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">{t("reviews.no_results")}</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="transition-transform hover:scale-105"
                aria-label={t("reviews.previous")}
              >
                {t("reviews.previous")}
              </Button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  className={`transition-transform hover:scale-105 ${
                    currentPage === index + 1 ? "bg-red-600 hover:bg-red-700" : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                  aria-label={`Page ${index + 1}`}
                >
                  {index + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="transition-transform hover:scale-105"
                aria-label={t("reviews.next")}
              >
                {t("reviews.next")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
