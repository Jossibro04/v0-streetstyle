"use client"

import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"

// Team member type
interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
  social: {
    twitter?: string
    linkedin?: string
    facebook?: string
    instagram?: string
  }
}

export default function MeetTheTeam() {
  const { t } = useLanguage()

  // Team members data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Maria Rodriguez",
      role: t("team.roles.founder"),
      bio: t("team.bios.maria"),
      image: "/placeholder.svg?height=400&width=400",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
      },
    },
    {
      id: 2,
      name: "Anil Kumar",
      role: t("team.roles.culinary_director"),
      bio: t("team.bios.anil"),
      image: "/placeholder.svg?height=400&width=400",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        facebook: "https://facebook.com",
      },
    },
    {
      id: 3,
      name: "Cheryl Alleyne",
      role: t("team.roles.community_manager"),
      bio: t("team.bios.cheryl"),
      image: "/placeholder.svg?height=400&width=400",
      social: {
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
      },
    },
    {
      id: 4,
      name: "Jerome Thomas",
      role: t("team.roles.tech_lead"),
      bio: t("team.bios.jerome"),
      image: "/placeholder.svg?height=400&width=400",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">{t("team.title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("team.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
            >
              <div className="relative h-64 w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-red-600 mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4 line-clamp-4">{member.bio}</p>

                <div className="flex space-x-3">
                  {member.social.twitter && (
                    <Link
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-red-600 transition"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                  )}
                  {member.social.linkedin && (
                    <Link
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-red-600 transition"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  )}
                  {member.social.facebook && (
                    <Link
                      href={member.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-red-600 transition"
                    >
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </Link>
                  )}
                  {member.social.instagram && (
                    <Link
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-red-600 transition"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
