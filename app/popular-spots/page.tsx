import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PopularSpotsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Popular Food Spots</h1>
          <p className="text-gray-600 mb-8">
            Discover the most visited and highly rated food spots across Trinidad and Tobago.
          </p>

          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">This page is under construction.</p>
            <Link href="/map">
              <Button className="bg-red-600 hover:bg-red-700">Explore Food Spots on the Map</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
