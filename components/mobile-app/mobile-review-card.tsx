import Image from "next/image"
import { Star, MessageSquare, Heart } from "lucide-react"
import Link from "next/link"

interface MobileReviewCardProps {
  id: number
  restaurantName: string
  location: string
  rating: number
  content: string
  image: string
  author: string
  date: string
  likes: number
  comments: number
}

export default function MobileReviewCard({
  id,
  restaurantName,
  location,
  rating,
  content,
  image,
  author,
  date,
  likes,
  comments,
}: MobileReviewCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt={author}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">{author}</p>
            <p className="text-gray-500 text-sm">{date}</p>
          </div>
        </div>
      </div>

      <Link href={`/restaurant/${id}`}>
        <div className="relative h-48 w-full">
          <Image src={image || "/placeholder.svg"} alt={restaurantName} fill className="object-cover" />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/restaurant/${id}`}>
            <h3 className="font-bold text-gray-900">{restaurantName}</h3>
          </Link>
          <div className="flex items-center bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
            <Star className="h-3 w-3 fill-red-600 text-red-600 mr-1" />
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">{location}</p>
        <p className="text-gray-700 line-clamp-3">{content}</p>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <button className="flex items-center text-gray-600">
            <Heart className="h-5 w-5 mr-1" />
            <span className="text-sm">{likes}</span>
          </button>
          <button className="flex items-center text-gray-600">
            <MessageSquare className="h-5 w-5 mr-1" />
            <span className="text-sm">{comments}</span>
          </button>
          <button className="text-red-600 text-sm font-medium">Read More</button>
        </div>
      </div>
    </div>
  )
}
