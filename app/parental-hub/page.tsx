"use client"

import { useState } from "react"
import ActivityWheel from "@/components/activity-wheel"

export default function ParentalHub() {
  const [showActivityWheel, setShowActivityWheel] = useState(false)

  const resources = [
    {
      title: "Understanding Child Rights",
      description: "Learn about the fundamental rights every child should have and how to support them.",
    },
    {
      title: "Screen Time Guidelines",
      description: "Best practices for managing your child's digital engagement and online safety.",
    },
    {
      title: "Emotional Development",
      description: "Support your child's emotional growth and build healthy communication.",
    },
    {
      title: "Progress Tracking",
      description: "Monitor your child's learning journey and achievements on Sashakt.",
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 hero-background py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white drop-shadow-lg mb-8 sm:mb-12">
            Parental Hub
          </h1>

          <div className="mb-8 sm:mb-12 bg-white/90 backdrop-blur rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Welcome to Our Parental Hub</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
              We understand that parents play a crucial role in their child's development. Our Parental Hub provides
              resources, guides, and tools to help you support your child's journey with Sashakt.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              From understanding child rights to monitoring progress, we've got everything you need to be an engaged and
              informed parent.
            </p>
          </div>

          <div className="mb-8 sm:mb-12 flex justify-center">
            <button
              onClick={() => setShowActivityWheel(true)}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all active:scale-95 text-base sm:text-lg shadow-lg hover:scale-105"
            >
              🎡 Discover Fun Activities
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-shadow shadow-md text-sm sm:text-base hover:scale-105 hover:-translate-y-1 transform transition-all duration-300"
              >
                <h3 className="text-lg sm:text-xl font-bold text-blue-600 mb-3">{resource.title}</h3>
                <p className="text-gray-700 text-sm sm:text-base">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showActivityWheel && <ActivityWheel onClose={() => setShowActivityWheel(false)} />}
    </main>
  )
}
