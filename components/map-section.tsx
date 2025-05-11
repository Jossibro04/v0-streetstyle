"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

// Sample review locations
const reviewLocations = [
  { id: 1, name: "Richard's Bake & Shark", location: "Maracas Bay", x: 180, y: 120, count: 24 },
  { id: 2, name: "Sauce Doubles", location: "Curepe Junction", x: 240, y: 200, count: 18 },
  { id: 3, name: "D'Avenue Corn Soup", location: "Port of Spain", x: 200, y: 180, count: 15 },
  { id: 4, name: "Debe Doubles", location: "Debe", x: 280, y: 300, count: 22 },
  { id: 5, name: "San Fernando Roti Shop", location: "San Fernando", x: 250, y: 320, count: 16 },
  { id: 6, name: "Tobago Crab & Dumpling", location: "Scarborough", x: 400, y: 100, count: 19 },
]

export default function MapSection() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Food Spots Map</h2>
        <p className="text-gray-600 mb-8">Discover the best street food spots across Trinidad and Tobago</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg p-4 border border-gray-200 shadow-sm relative">
            <div className="relative w-full" style={{ height: "500px" }}>
              {/* Simplified SVG map of Trinidad and Tobago */}
              <svg viewBox="0 0 500 400" className="w-full h-full">
                {/* Trinidad */}
                <path
                  d="M150,150 L300,150 L350,300 L200,350 L100,250 Z"
                  fill="#f8f8f8"
                  stroke="#e0e0e0"
                  strokeWidth="2"
                />
                {/* Tobago */}
                <path d="M380,80 L450,80 L450,120 L380,120 Z" fill="#f8f8f8" stroke="#e0e0e0" strokeWidth="2" />

                {/* Location markers */}
                {reviewLocations.map((loc) => (
                  <g key={loc.id} onClick={() => setSelectedLocation(loc.id === selectedLocation ? null : loc.id)}>
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
                  </g>
                ))}
              </svg>

              {/* Map labels */}
              <div className="absolute top-4 left-4 text-gray-700 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                  <span>Review Locations</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Popular Locations</h3>
            <div className="space-y-4">
              {reviewLocations.map((loc) => (
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
                        <p className="text-gray-600 text-sm">{loc.location}</p>
                      </div>
                      <div className="bg-red-100 text-red-600 px-2 py-1 rounded h-fit">{loc.count} reviews</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
