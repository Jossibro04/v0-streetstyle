import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <h2 className="text-6xl font-extrabold mb-4 tracking-tight">Streetstyle</h2>
            <p className="text-gray-400 mb-6">
              Connecting food lovers with the best street food experiences across Trinidad and Tobago.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/popular-spots" className="text-gray-400 hover:text-white transition">
                  Popular Spots
                </Link>
              </li>
              <li>
                <Link href="/write-review" className="text-gray-400 hover:text-white transition">
                  Write a Review
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
            <p className="text-gray-400 mb-6">
              Follow us on social media for the latest updates on Trinidad's food scene.
            </p>
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
          <p>&copy; {new Date().getFullYear()} Streetstyle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
