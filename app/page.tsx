import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import TrendingReviews from "@/components/trending-reviews"
import MapSection from "@/components/map-section"
import CommunitySection from "@/components/community-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <TrendingReviews />
      <MapSection />
      <CommunitySection />
      <Footer />
    </main>
  )
}
