"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Camera, MapPin, Star, Navigation } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function WriteReviewPage() {
  const [overallRating, setOverallRating] = useState<number>(0)
  const [tasteRating, setTasteRating] = useState<number>(0)
  const [serviceRating, setServiceRating] = useState<number>(0)
  const [valueRating, setValueRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<{ category: string; value: number }>({ category: "", value: 0 })
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [location, setLocation] = useState<string>("")
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false)
  const [showPhotoUpload, setShowPhotoUpload] = useState<boolean>(false)

  const handleRatingClick = (category: string, value: number) => {
    switch (category) {
      case "overall":
        setOverallRating(value)
        break
      case "taste":
        setTasteRating(value)
        break
      case "service":
        setServiceRating(value)
        break
      case "value":
        setValueRating(value)
        break
    }
  }

  const handleRatingHover = (category: string, value: number) => {
    setHoveredRating({ category, value })
  }

  const handleRatingLeave = () => {
    setHoveredRating({ category: "", value: 0 })
  }

  const detectLocation = () => {
    setIsDetectingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use a reverse geocoding service here
          // For this example, we'll just set some placeholder text
          setLocation("Current location detected")
          setIsDetectingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocation("")
          setIsDetectingLocation(false)
        },
      )
    } else {
      alert("Geolocation is not supported by this browser.")
      setIsDetectingLocation(false)
    }
  }

  const StarRating = ({
    category,
    value,
    onChange,
  }: { category: string; value: number; onChange: (value: number) => void }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 cursor-pointer ${
              star <= (hoveredRating.category === category ? hoveredRating.value : value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => onChange(star)}
            onMouseEnter={() => handleRatingHover(category, star)}
            onMouseLeave={handleRatingLeave}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {value > 0 ? `${value} star${value > 1 ? "s" : ""}` : "Click to rate"}
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Write a Review</h1>
            <p className="mt-2 text-gray-600">Share your food experience with the community</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Review Details</CardTitle>
              <CardDescription>Please provide detailed information about your food experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="place-name">Restaurant/Food Spot Name*</Label>
                <Input id="place-name" placeholder="Name of the restaurant or food spot" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location*</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="location"
                      placeholder="Address or area"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <Button variant="outline" size="icon" onClick={detectLocation} disabled={isDetectingLocation}>
                    {isDetectingLocation ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-red-600" />
                    ) : (
                      <Navigation className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Auto-detect your location or enter manually</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visit-date">Date of Visit*</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      {date ? format(date, "PPP") : <span className="text-gray-500">Select a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuisine-type">Cuisine Type*</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cuisine type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trinidadian">Trinidadian</SelectItem>
                    <SelectItem value="tobagonian">Tobagonian</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="creole">Creole</SelectItem>
                    <SelectItem value="bbq">BBQ</SelectItem>
                    <SelectItem value="seafood">Seafood</SelectItem>
                    <SelectItem value="street-food">Street Food</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium text-gray-900">Ratings</h3>

                <div className="space-y-2">
                  <Label>Overall Rating*</Label>
                  <StarRating
                    category="overall"
                    value={overallRating}
                    onChange={(value) => handleRatingClick("overall", value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Taste</Label>
                  <StarRating
                    category="taste"
                    value={tasteRating}
                    onChange={(value) => handleRatingClick("taste", value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Service</Label>
                  <StarRating
                    category="service"
                    value={serviceRating}
                    onChange={(value) => handleRatingClick("service", value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Value for Money</Label>
                  <StarRating
                    category="value"
                    value={valueRating}
                    onChange={(value) => handleRatingClick("value", value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-title">Review Title*</Label>
                <Input id="review-title" placeholder="Summarize your experience" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-content">Your Review*</Label>
                <Textarea
                  id="review-content"
                  placeholder="Tell us about your experience. What did you eat? How was the food? Would you recommend it?"
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>What did you try?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="dish-name-1">Dish Name</Label>
                    <Input id="dish-name-1" placeholder="E.g., Bake and Shark" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dish-price-1">Price (Optional)</Label>
                    <Input id="dish-price-1" placeholder="E.g., $25" />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  + Add Another Dish
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Add Photos (Optional)</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPhotoUpload(!showPhotoUpload)}
                    className="text-red-600 hover:text-red-700"
                  >
                    {showPhotoUpload ? "Hide" : "Show"}
                  </Button>
                </div>

                {showPhotoUpload && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Drag and drop photos here, or click to upload</p>
                    <p className="text-xs text-gray-500 mt-1">Maximum 5 photos, 5MB each</p>
                    <Input id="photo-upload" type="file" multiple className="hidden" />
                    <Button variant="outline" size="sm" className="mt-4">
                      Select Photos
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Visit Type</Label>
                <RadioGroup defaultValue="dine-in">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dine-in" id="dine-in" />
                      <Label htmlFor="dine-in" className="cursor-pointer">
                        Dine-in
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="takeout" id="takeout" />
                      <Label htmlFor="takeout" className="cursor-pointer">
                        Takeout
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="cursor-pointer">
                        Delivery
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox id="recommend" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="recommend"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I would recommend this place
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-red-600 hover:bg-red-700">Submit Review</Button>
              <p className="text-xs text-gray-500 text-center">
                By submitting this review, you agree to our review guidelines and terms of service.
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
