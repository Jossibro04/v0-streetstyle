"use client"

import { Utensils, Camera, MapPin, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function CommunitySection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">{t("community.title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("community.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-red-50 rounded-lg p-6 hover:shadow-md transition-all duration-300">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <Utensils className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 text-center">{t("community.share.title")}</h3>
            <p className="text-gray-600 text-center">{t("community.share.description")}</p>
          </div>

          <div className="bg-red-50 rounded-lg p-6 hover:shadow-md transition-all duration-300">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <Camera className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 text-center">{t("community.showcase.title")}</h3>
            <p className="text-gray-600 text-center">{t("community.showcase.description")}</p>
          </div>

          <div className="bg-red-50 rounded-lg p-6 hover:shadow-md transition-all duration-300">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <MapPin className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 text-center">{t("community.discover.title")}</h3>
            <p className="text-gray-600 text-center">{t("community.discover.description")}</p>
          </div>

          <div className="bg-red-50 rounded-lg p-6 hover:shadow-md transition-all duration-300">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <Users className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 text-center">{t("community.connect.title")}</h3>
            <p className="text-gray-600 text-center">{t("community.connect.description")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
