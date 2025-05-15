import Hero from "@/components/hero"
import MapSection from "@/components/map-section"
import TrendingVendors from "@/components/trending-vendors"
import CommunitySection from "@/components/community-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MapSection />
        <TrendingVendors />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  )
}
