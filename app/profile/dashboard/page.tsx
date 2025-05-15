"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BookmarkCheck, Calendar, Heart, MapPin, Star } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"

// Mock user data
const userData = {
  id: "user123",
  name: "Alex Johnson",
  username: "foodie_alex",
  email: "alex@example.com",
  phone: "+1 (555) 123-4567",
  location: "Port of Spain, Trinidad",
  bio: "Food enthusiast exploring hidden gems across Trinidad & Tobago. I love discovering authentic local flavors!",
  avatar: "/placeholder.svg?height=300&width=300",
  coverPhoto: "/placeholder.svg?height=400&width=1200",
  joinDate: "March 2023",
  stats: {
    spotsSubmitted: 8,
    reviews: 12,
    favorites: 24,
    followers: 56,
    following: 32,
  },
  preferences: {
    cuisines: ["Creole", "Indian", "Seafood", "Street Food"],
    dietaryRestrictions: ["Vegetarian options"],
    priceRange: "$$",
  },
  badges: [
    { name: "Explorer", description: "Discovered 10+ hidden gems", icon: "🔍" },
    { name: "Foodie", description: "Submitted 5+ quality reviews", icon: "🍽️" },
    { name: "Local Expert", description: "Verified knowledge of local cuisine", icon: "🏆" },
  ],
}

// Mock activity data
const recentActivity = [
  {
    type: "spot_submission",
    title: "Submitted a new spot",
    description: "Island Grill Jerk Chicken",
    date: "2 days ago",
    icon: MapPin,
  },
  {
    type: "favorite",
    title: "Added to favorites",
    description: "Sauce Doubles",
    date: "1 week ago",
    icon: Heart,
  },
  {
    type: "review",
    title: "Wrote a review",
    description: "Richard's Bake & Shark",
    date: "2 weeks ago",
    icon: Star,
  },
  {
    type: "badge",
    title: "Earned a badge",
    description: "Local Expert",
    date: "1 month ago",
    icon: BookmarkCheck,
  },
]

// Mock favorite spots
const favoriteSpots = [
  {
    id: "spot1",
    name: "Richard's Bake & Shark",
    location: "Maracas Bay",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
  },
  {
    id: "spot2",
    name: "Sauce Doubles",
    location: "Curepe Junction",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
  },
  {
    id: "spot3",
    name: "Island Grill Jerk Chicken",
    location: "San Fernando",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
  },
]

export default function ProfileDashboard() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(userData)

  const handleSaveProfile = () => {
    // In a real app, you would save the profile data to the server here
    setIsEditing(false)
    // Show success message
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Cover Photo and Profile Summary */}
        <div className="relative">
          <div className="h-48 md:h-64 w-full relative">
            <Image
              src={profileData.coverPhoto || "/placeholder.svg"}
              alt="Cover"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
          </div>

          <div className="container mx-auto px-4">
            <div className="relative -mt-16 sm:-mt-24 pb-4 flex flex-col sm:flex-row items-center sm:items-end gap-4">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white">
                <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="text-center sm:text-left flex-1 sm:pb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-white sm:text-gray-900">{profileData.name}</h1>
                <p className="text-white/90 sm:text-gray-600">@{profileData.username}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                  <div className="flex items-center text-white/90 sm:text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center text-white/90 sm:text-gray-600 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {profileData.joinDate}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="bg-white">
                  Edit Profile
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">Share Profile</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="spots">My Spots</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Your Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">{profileData.stats.spotsSubmitted}</p>
                        <p className="text-sm text-gray-600">Spots Submitted</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">{profileData.stats.reviews}</p>
                        <p className="text-sm text-gray-600">Reviews</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">{profileData.stats.favorites}</p>
                        <p className="text-sm text-gray-600">Favorites</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">{profileData.stats.followers}</p>
                        <p className="text-sm text-gray-600">Followers</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full text-sm">
                        View Detailed Stats
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Badges */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Your Badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {profileData.badges.map((badge, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-red-100 text-red-600 rounded-full text-xl">
                            {badge.icon}
                          </div>
                          <div>
                            <p className="font-medium">{badge.name}</p>
                            <p className="text-xs text-gray-600">{badge.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full text-sm">
                        View All Badges
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Preferences */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Your Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Favorite Cuisines</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {profileData.preferences.cuisines.map((cuisine, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50">
                              {cuisine}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Dietary Preferences</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {profileData.preferences.dietaryRestrictions.map((diet, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50">
                              {diet}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Price Range</p>
                        <Badge variant="outline" className="bg-gray-50 mt-1">
                          {profileData.preferences.priceRange}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full text-sm">
                        Edit Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest interactions on StreetStyle</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full">
                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                        <div className="text-xs text-gray-500">{activity.date}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Favorite Spots */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Favorite Spots</CardTitle>
                  <CardDescription>Places you've marked as favorites</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {favoriteSpots.map((spot, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        <div className="relative h-32">
                          <Image src={spot.image || "/placeholder.svg"} alt={spot.name} fill className="object-cover" />
                          <div className="absolute top-2 right-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 bg-white/80 hover:bg-white rounded-full"
                            >
                              <Heart className="h-4 w-4 fill-red-600 text-red-600" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3">
                          <Link
                            href={`/restaurant/${spot.id}`}
                            className="font-medium hover:text-red-600 transition-colors"
                          >
                            {spot.name}
                          </Link>
                          <p className="text-xs text-gray-600">{spot.location}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-xs">{spot.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      View All Favorites
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="spots">
              <Card>
                <CardHeader>
                  <CardTitle>My Submitted Spots</CardTitle>
                  <CardDescription>Food spots you've added to our community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-600">This section will display all the food spots you've submitted.</p>
                    <Button className="mt-4 bg-red-600 hover:bg-red-700">
                      <Link href="/submit-spot">Submit a New Spot</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>My Favorites</CardTitle>
                  <CardDescription>All your favorite food spots in one place</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-600">This section will display all your favorite food spots.</p>
                    <Button className="mt-4 bg-red-600 hover:bg-red-700">
                      <Link href="/spots">Discover More Spots</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your account information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={profileData.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue={profileData.username} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={profileData.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={profileData.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue={profileData.location} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" defaultValue={profileData.bio} rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                        <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Change Picture</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cover Photo</Label>
                    <div className="relative h-32 rounded-md overflow-hidden">
                      <Image
                        src={profileData.coverPhoto || "/placeholder.svg"}
                        alt="Cover"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="secondary">Change Cover</Button>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-red-600 hover:bg-red-700">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
