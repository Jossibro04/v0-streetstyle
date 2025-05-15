"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Camera, MapPin, Navigation, Clock, DollarSign, Phone, Globe } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function SubmitSpotPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [location, setLocation] = useState<string>("")
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false)
  const [showPhotoUpload, setShowPhotoUpload] = useState<boolean>(true)
  const [showCustomCuisine, setShowCustomCuisine] = useState<boolean>(false)
  const [customCuisine, setCustomCuisine] = useState<string>("")
  const [cuisineType, setCuisineType] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleCuisineChange = (value: string) => {
    setCuisineType(value)
    setShowCustomCuisine(value === "other")
    if (value !== "other") {
      setCustomCuisine("")
    }
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
          toast({
            title: "Location detected",
            description: "We've detected your current location.",
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocation("")
          setIsDetectingLocation(false)
          toast({
            title: "Location error",
            description: "Unable to find your location. Please try again.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      })
      setIsDetectingLocation(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Spot submitted!",
        description: "Thank you for contributing to our community. Your spot will be reviewed shortly.",
      })
      // In a real app, you would reset the form here
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Submit a Food Spot</h1>
            <p className="mt-2 text-gray-600">
              Share your favorite hidden gems and help others discover amazing local food
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Spot Details</CardTitle>
                <CardDescription>
                  Please provide detailed information about this food spot to help others find it
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="spot-name">Food Spot Name*</Label>
                  <Input id="spot-name" placeholder="Name of the food spot or vendor" required />
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
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={detectLocation}
                      disabled={isDetectingLocation}
                    >
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
                  <Label htmlFor="description">Description*</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about this food spot. What makes it special? What's the atmosphere like?"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cuisine-type">Cuisine Type*</Label>
                  <Select onValueChange={handleCuisineChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cuisine type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="creole">Creole</SelectItem>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="bbq">BBQ</SelectItem>
                      <SelectItem value="seafood">Seafood</SelectItem>
                      <SelectItem value="street-food">Street Food</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  {showCustomCuisine && (
                    <div className="mt-2">
                      <Label htmlFor="custom-cuisine">Specify Cuisine</Label>
                      <Input
                        id="custom-cuisine"
                        placeholder="Enter cuisine type"
                        value={customCuisine}
                        onChange={(e) => setCustomCuisine(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="operating-hours">Operating Hours</Label>
                    <Input id="operating-hours" placeholder="e.g., Mon-Fri: 8am-6pm, Sat: 9am-3pm" />
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-xs text-gray-500">Include days and hours if known</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price-range">Price Range</Label>
                    <Select>
                      <SelectTrigger id="price-range">
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">$ (Budget)</SelectItem>
                        <SelectItem value="moderate">$$ (Moderate)</SelectItem>
                        <SelectItem value="expensive">$$$ (Expensive)</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center mt-1">
                      <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-xs text-gray-500">Approximate cost per person</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Information</Label>
                    <Input id="contact" placeholder="Phone number or email (if available)" />
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-xs text-gray-500">How to reach the vendor</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website or Social Media (Optional)</Label>
                    <Input id="website" placeholder="Website, Instagram, Facebook, etc." />
                    <div className="flex items-center mt-1">
                      <Globe className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-xs text-gray-500">Online presence if available</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Signature Dishes</Label>
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
                  <Button type="button" variant="outline" size="sm" className="mt-2">
                    + Add Another Dish
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Add Photos</Label>
                    <Button
                      type="button"
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
                      <Button type="button" variant="outline" size="sm" className="mt-4">
                        Select Photos
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Spot Type</Label>
                  <RadioGroup defaultValue="street-vendor">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="street-vendor" id="street-vendor" />
                        <Label htmlFor="street-vendor" className="cursor-pointer">
                          Street Vendor
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="food-truck" id="food-truck" />
                        <Label htmlFor="food-truck" className="cursor-pointer">
                          Food Truck
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="small-restaurant" id="small-restaurant" />
                        <Label htmlFor="small-restaurant" className="cursor-pointer">
                          Small Restaurant
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="home-based" id="home-based" />
                        <Label htmlFor="home-based" className="cursor-pointer">
                          Home-based
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="seating" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="seating"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Seating Available
                        </label>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="takeout" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="takeout"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Takeout Available
                        </label>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="parking" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="parking"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Parking Available
                        </label>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="hidden-gem" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="hidden-gem"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Hidden Gem
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="submitter-name">Your Name (Optional)</Label>
                  <Input id="submitter-name" placeholder="Your name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="submitter-email">Your Email (Optional)</Label>
                  <Input id="submitter-email" type="email" placeholder="Your email" />
                  <p className="text-xs text-gray-500">
                    We'll only use this to contact you if we need more information
                  </p>
                </div>

                <div className="space-y-4 border-t pt-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="business-owner" />
                    <div>
                      <Label htmlFor="business-owner" className="text-base font-medium">
                        I am the business owner
                      </Label>
                      <p className="text-sm text-gray-500">Check this if you own or represent this food spot</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-md">
                    <h3 className="font-medium text-blue-800">Business Owner?</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      If this is your business, you can claim and verify your listing to gain access to additional
                      features:
                    </p>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc pl-5">
                      <li>Respond to customer reviews</li>
                      <li>Update your business information</li>
                      <li>Add special offers and promotions</li>
                      <li>Access analytics and insights</li>
                    </ul>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-3 bg-white text-blue-700 border-blue-300 hover:bg-blue-100"
                    >
                      Learn More About Business Verification
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Food Spot"
                  )}
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  By submitting this spot, you agree to our community guidelines and terms of service.
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
