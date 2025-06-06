"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="bg-red-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{t("hero.title")}</h1>
            <p className="text-xl mb-6">Discover hidden and underrated local food spots across Trinidad and Tobago</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-red-700 font-bold transition-transform hover:scale-105"
              >
                <Link href="/spots" className="w-full h-full flex items-center justify-center">
                  Find a Spot
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-white border-white text-red-600 hover:bg-gray-100 hover:text-red-700 transition-transform hover:scale-105"
              >
                <Link href="/submit-spot" className="w-full h-full flex items-center justify-center">
                  Submit a Spot
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center text-white/80">
              <span className="text-lg">{t("hero.join")}</span>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl hidden lg:block">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Trinidad street food"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm inline-block w-fit mb-2">
                Featured Vendor
              </div>
              <h3 className="text-2xl font-bold text-white">Maracas Bay Bake & Shark</h3>
              <p className="text-white/90">"A taste of paradise that will transport you to food heaven!"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
