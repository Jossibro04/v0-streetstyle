import { Utensils, Camera, MapPin, Users } from "lucide-react"

export default function CommunitySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Join Our Foodie Community</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with fellow food enthusiasts, share your culinary adventures, and discover hidden gems across
            Trinidad and Tobago.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-red-50 rounded-lg p-6 hover:shadow-md transition-all duration-300">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <Utensils className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 text-center">Share Your Experiences</h3>
            <p className="text-gray-600 text-center">
              Write detailed reviews of your favorite street food spots and help others discover amazing local cuisine.
            </p>
          </div>

          <div className="bg-red-50 rounded-lg p-6 hover:shadow-md transition-all duration-300">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <Camera className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 text-center">Showcase Your Finds</h3>
            <p className="text-gray-600 text-center">
              Upload photos of mouthwatering dishes and create a visual feast for the community.
            </p>
          </div>

          <div className="bg-red-50 rounded-lg p-6 hover:shadow-md transition-all duration-300">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <MapPin className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 text-center">Discover New Places</h3>
            <p className="text-gray-600 text-center">
              Explore our interactive map to find hidden culinary gems across Trinidad and Tobago.
            </p>
          </div>

          <div className="bg-red-50 rounded-lg p-6 hover:shadow-md transition-all duration-300">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <Users className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 text-center">Connect With Foodies</h3>
            <p className="text-gray-600 text-center">
              Follow other food enthusiasts, engage in discussions, and build your foodie network.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
