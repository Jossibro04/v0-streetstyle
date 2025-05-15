"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Store } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#111827] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Store className="h-8 w-8 text-white" />
              <h2 className="text-5xl font-extrabold tracking-tight">Streetstyle</h2>
            </div>
            <p className="text-gray-400 mb-6">Discover the best local street food spots in Trinidad & Tobago</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/spots" className="hover:text-red-400 transition-colors">
                  Popular Spots
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-red-400 transition-colors">
                  Food Map
                </Link>
              </li>
              <li>
                <Link href="/submit-spot" className="hover:text-red-400 transition-colors">
                  Submit a Spot
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="hover:text-red-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-red-400 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/community-guidelines" className="hover:text-red-400 transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-red-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-red-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <p className="text-gray-400 mb-6">Follow us on social media for updates and special features</p>

            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-400">
                <span className="font-medium mr-2">Phone:</span>
                <a href="tel:+18681234567" className="hover:text-white transition">
                  +1 (868) 123-4567
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <span className="font-medium mr-2">Email:</span>
                <a href="mailto:info@streetstyle.com" className="hover:text-white transition">
                  info@streetstyle.com
                </a>
              </div>
            </div>

            <div className="flex space-x-6">
              <Link href="https://facebook.com" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-white transition">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-white transition">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} Streetstyle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
