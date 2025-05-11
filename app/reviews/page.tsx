"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ReviewsList from "@/components/reviews-list"
import { useLanguage } from "@/contexts/language-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function ReviewsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-red-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("reviews.title")}</h1>
              <p className="text-xl mb-8">{t("reviews.subtitle")}</p>

              <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
                <div className="relative h-16">
                  <Input
                    type="text"
                    placeholder={t("reviews.search_placeholder")}
                    className="h-full pl-12 pr-32 py-3 w-full text-gray-900 bg-white border-0 rounded-full shadow-lg focus:ring-2 focus:ring-red-500 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-red-600 hover:bg-red-700 transition-transform hover:scale-105 h-12 px-6"
                  >
                    {t("reviews.search_button")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Reviews List Section */}
        <ReviewsList />
      </main>
      <Footer />
    </div>
  )
}
