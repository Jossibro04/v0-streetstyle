"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Search, Heart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function MobileNavbar() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center">
            <div className="text-3xl font-extrabold text-red-700 tracking-tight">Streetstyle</div>
          </Link>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full transition-transform hover:scale-105">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full transition-transform hover:scale-105"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>
                    </Sheet>
                  </div>
                  <nav className="flex flex-col gap-1">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100">
                      <Home className="h-5 w-5" />
                      <span>Home</span>
                    </Link>
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100">
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <Link href="/favorites" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100">
                      <Heart className="h-5 w-5" />
                      <span>Favorites</span>
                    </Link>
                    <Link href="/search" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100">
                      <Search className="h-5 w-5" />
                      <span>Search</span>
                    </Link>
                  </nav>
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <Button className="w-full bg-red-600 hover:bg-red-700 transition-transform hover:scale-105">
                      <Link href="/write-review">Write a Review</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around h-16">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center w-full h-full ${
              activeTab === "home" ? "text-red-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("home")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/search"
            className={`flex flex-col items-center justify-center w-full h-full ${
              activeTab === "search" ? "text-red-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("search")}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs mt-1">Search</span>
          </Link>
          <Link
            href="/favorites"
            className={`flex flex-col items-center justify-center w-full h-full ${
              activeTab === "favorites" ? "text-red-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            <Heart className="h-5 w-5" />
            <span className="text-xs mt-1">Favorites</span>
          </Link>
          <Link
            href="/profile"
            className={`flex flex-col items-center justify-center w-full h-full ${
              activeTab === "profile" ? "text-red-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
