"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Camera, Clock, Utensils, Info } from "lucide-react"
import Link from "next/link"

export default function SubmitSpotSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-900">Know a Hidden Food Gem?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Help our community discover the best local food spots in Trinidad and Tobago by sharing your favorite hidden
            gems
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Submit a Food Spot</h3>
            <p className="text-gray-600 mb-6">
              We're on a mission to uncover the most authentic and underrated food spots across the islands. Share your
              local knowledge and help others discover amazing culinary experiences.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-4">
                  <MapPin className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Location Details</h4>
                  <p className="text-gray-600 text-sm">Provide the exact location to help others find this spot</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-4">
                  <Utensils className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Food Information</h4>
                  <p className="text-gray-600 text-sm">Tell us about the cuisine type and signature dishes</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-4">
                  <Clock className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Operating Hours</h4>
                  <p className="text-gray-600 text-sm">Share when this spot is open for business</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-4">
                  <Camera className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Photos</h4>
                  <p className="text-gray-600 text-sm">Upload photos to showcase the food and atmosphere</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-4">
                  <Info className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Why It's Special</h4>
                  <p className="text-gray-600 text-sm">Tell us what makes this spot a hidden gem worth visiting</p>
                </div>
              </div>
            </div>

            <Link href="/submit-spot">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 h-auto text-lg">
                Submit a Food Spot
              </Button>
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Recently Submitted Spots</h3>

            <div className="space-y-4">
              {[
                {
                  name: "Manzanilla Beach Shark & Bake",
                  location: "Manzanilla",
                  submitter: "John D.",
                  days: 2,
                },
                {
                  name: "Arima Market Doubles",
                  location: "Arima",
                  submitter: "Sarah T.",
                  days: 3,
                },
                {
                  name: "Carenage Fish Broth",
                  location: "Carenage",
                  submitter: "Michael R.",
                  days: 5,
                },
              ].map((spot, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900">{spot.name}</h4>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{spot.location}</span>
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">New</div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Submitted by {spot.submitter} {spot.days} days ago
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 mb-2">Your submission could be featured here!</p>
              <Link href="/spots/recent">
                <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                  View All Recent Submissions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
