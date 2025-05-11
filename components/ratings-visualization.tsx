import { Star } from "lucide-react"

interface RatingsVisualizationProps {
  averageRating: number
  totalRatings: number
  ratingDistribution: number[]
}

export default function RatingsVisualization({
  averageRating,
  totalRatings,
  ratingDistribution,
}: RatingsVisualizationProps) {
  // Find the max value in the distribution for scaling
  const maxCount = Math.max(...ratingDistribution)

  return (
    <div className="bg-zinc-900 text-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2 border-b border-zinc-700 pb-2">
        <h3 className="text-sm font-medium uppercase tracking-wider">RATINGS</h3>
        <span className="text-sm">{(totalRatings / 1000).toFixed(1)}K FANS</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <Star className="h-5 w-5 text-green-500 fill-green-500" />

        <div className="flex items-end h-16 space-x-1 mx-2">
          {ratingDistribution.map((count, index) => (
            <div
              key={index}
              className="w-4 bg-blue-400/80 rounded-sm"
              style={{
                height: `${(count / maxCount) * 100}%`,
                opacity: 0.7 + index / 10,
              }}
            />
          ))}
        </div>

        <div className="flex flex-col items-end">
          <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.round(averageRating) ? "text-green-500 fill-green-500" : "text-zinc-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
