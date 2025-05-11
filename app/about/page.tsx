"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MeetTheTeam from "@/components/meet-the-team"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-red-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("about.title")}</h1>
              <p className="text-xl">{t("about.subtitle")}</p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">{t("about.our_story.title")}</h2>
                <p className="text-gray-700 mb-4">{t("about.our_story.p1")}</p>
                <p className="text-gray-700 mb-4">{t("about.our_story.p2")}</p>
                <p className="text-gray-700">{t("about.our_story.p3")}</p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Street food in Trinidad and Tobago"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">{t("about.our_mission.title")}</h2>
              <p className="text-gray-700 mb-8">{t("about.our_mission.description")}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-600 text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{t("about.our_mission.connect.title")}</h3>
                  <p className="text-gray-600">{t("about.our_mission.connect.description")}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-600 text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{t("about.our_mission.promote.title")}</h3>
                  <p className="text-gray-600">{t("about.our_mission.promote.description")}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-600 text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{t("about.our_mission.support.title")}</h3>
                  <p className="text-gray-600">{t("about.our_mission.support.description")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <MeetTheTeam />
      </main>
      <Footer />
    </div>
  )
}
