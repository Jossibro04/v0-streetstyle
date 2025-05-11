"use client"

import Link from "next/link"
import { User, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-6xl font-extrabold text-red-700 tracking-tight">Streetstyle</div>
          </Link>

          {/* Search Bar - visible on medium screens and up */}
          <div className="hidden md:flex items-center max-w-md w-full mx-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search by cuisine"
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-red-500 transition">
              Home
            </Link>
            <Link href="/reviews" className="text-gray-700 hover:text-red-500 transition">
              Reviews
            </Link>
            <Link href="/map" className="text-gray-700 hover:text-red-500 transition">
              Map
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-500 transition">
              About
            </Link>

            {/* Profile Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full transition-transform hover:scale-105">
                  <User className="h-5 w-5 text-gray-700" />
                  <span className="sr-only">Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-gray-200">
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                  <Link href="/login" className="w-full">
                    Log In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                  <Link href="/signup" className="w-full">
                    Sign Up
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden transition-transform hover:scale-105"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200 mt-3">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="Search by cuisine"
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-red-500 transition px-3 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/reviews"
                className="text-gray-700 hover:text-red-500 transition px-3 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="/map"
                className="text-gray-700 hover:text-red-500 transition px-3 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Map
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-red-500 transition px-3 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex space-x-2 px-3 py-2">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-red-500 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <span className="text-gray-500">|</span>
                <Link
                  href="/signup"
                  className="text-gray-700 hover:text-red-500 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
