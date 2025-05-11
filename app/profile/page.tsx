"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, Edit, Trash2, MapPin, Calendar, Settings, LogOut, User, FileText, Heart } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

// Mock data for user profile
const userData = {
  name: "Maria Rodriguez",
  username: "foodie_maria",
  email: "maria@example.com",
  joinDate: "January 2023",
  location: "Port of Spain, Trinidad",
  bio: "Food enthusiast exploring the best street food in Trinidad & Tobago. Always on the hunt for authentic flavors and hidden gems!",
  avatar: "/placeholder.svg?height=200&width=200",
  stats: {
    reviews: 24,
    photos: 56,
    followers: 128,
    following: 87,
    favorites: 42,
  },
}

// Mock data for user reviews
const userReviews = [
  {
    id: 1,
    restaurantName: "Richard's Bake & Shark",
    location: "Maracas Bay",
    date: "2 weeks ago",
    rating: 4.8,
    content:
      "The best bake and shark I've ever had! The garlic sauce is to die for. The bread was perfectly fried and the shark was tender and flavorful. Highly recommend visiting on a weekday to avoid the crowds.",
    image: "/placeholder.svg?height=200&width=300",
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    restaurantName: "Sauce Doubles",
    location: "Curepe Junction",
    date: "1 month ago",
    rating: 4.7,
    content:
      "Perfect balance of spicy and savory. The bara is so soft! I always get mine with slight pepper and extra chadon beni. The vendor is very friendly and the line moves quickly even when it's long.",
    image: "/placeholder.svg?height=200&width=300",
    likes: 18,
    comments: 5,
  },
  {
    id: 3,
    restaurantName: "Island Grill Jerk Chicken",
    location: "San Fernando",
    date: "2 months ago",
    rating: 4.5,
    content:
      "Perfectly spiced and grilled to perfection. The sides are amazing too! Their rice and peas complement the jerk chicken perfectly, and don't miss out on their plantains.",
    image: "/placeholder.svg?height=200&width=300",
    likes: 15,
    comments: 3,
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("reviews")

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                  <p className="text-gray-500">@{userData.username}</p>
                  <div className="flex items-center mt-2 text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{userData.location}</span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">Joined {userData.joinDate}</span>
                  </div>
                  <p className="text-gray-700 text-center mt-4">{userData.bio}</p>

                  <div className="grid grid-cols-3 gap-4 w-full mt-6">
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900">{userData.stats.reviews}</p>
                      <p className="text-sm text-gray-600">Reviews</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900">{userData.stats.photos}</p>
                      <p className="text-sm text-gray-600">Photos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900">{userData.stats.favorites}</p>
                      <p className="text-sm text-gray-600">Favorites</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6 w-full">
                    <Button className="flex-1 bg-red-600 hover:bg-red-700">Edit Profile</Button>
                    <Button variant="outline" className="flex-1">
                      Share Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 space-y-2">
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50">
                <User className="mr-2 h-5 w-5" />
                My Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50">
                <FileText className="mr-2 h-5 w-5" />
                My Reviews
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50">
                <Heart className="mr-2 h-5 w-5" />
                Favorites
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="reviews" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">My Reviews</h3>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Link href="/write-review">Write a Review</Link>
                  </Button>
                </div>

                {userReviews.map((review) => (
                  <Card key={review.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative h-48 md:h-auto">
                        <Image
                          src={review.image || "/placeholder.svg"}
                          alt={review.restaurantName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{review.restaurantName}</h4>
                            <p className="text-gray-600 text-sm">{review.location}</p>
                          </div>
                          <div className="flex items-center bg-red-100 text-red-600 px-2 py-1 rounded">
                            <Star className="h-4 w-4 fill-red-600 text-red-600 mr-1" />
                            <span>{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mt-3 line-clamp-3">{review.content}</p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-gray-500 text-sm">{review.date}</span>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                              <Edit className="h-4 w-4" />
                              <span className="ml-1">Edit</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                              <span className="ml-1">Delete</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="photos">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">My Photos</h3>
                  <Button variant="outline">Upload Photos</Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=300&width=300`}
                        alt={`Food photo ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="favorites">
                <h3 className="text-xl font-bold text-gray-900 mb-6">My Favorite Places</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-40">
                        <Image
                          src={`/placeholder.svg?height=200&width=400`}
                          alt={`Favorite restaurant ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white rounded-full">
                            <Heart className="h-5 w-5 text-red-600 fill-red-600" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-bold text-gray-900">Favorite Restaurant {index + 1}</h4>
                        <p className="text-gray-600 text-sm">Location {index + 1}</p>
                        <div className="flex items-center mt-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 text-gray-300" />
                          <span className="ml-2 text-sm text-gray-600">4.0</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Update your account information and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={userData.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue={userData.username} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={userData.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue={userData.location} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" defaultValue={userData.bio} rows={4} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatar">Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                          <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline">Change Picture</Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-red-600 hover:bg-red-700">Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
