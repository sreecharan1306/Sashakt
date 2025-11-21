"use client"
import { useState, useRef, useEffect } from "react"

interface Activity {
  name: string
  description: string
  emoji: string
}

const activities: Activity[] = [
  { name: "Story Time", description: "Read a book together and discuss the story", emoji: "📖" },
  { name: "Art & Craft", description: "Create something fun with colors and imagination", emoji: "🎨" },
  { name: "Outdoor Play", description: "Go outside and play games together", emoji: "⚽" },
  { name: "Cooking Together", description: "Prepare a meal together and enjoy it", emoji: "👨‍🍳" },
  { name: "Movie Night", description: "Watch a family-friendly movie together", emoji: "🎬" },
  { name: "Music & Dance", description: "Listen to music and dance together", emoji: "🎵" },
  { name: "Board Games", description: "Play fun board games as a family", emoji: "🎲" },
  { name: "Nature Walk", description: "Explore nature and learn about plants and animals", emoji: "🌳" },
]

interface ActivityWheelProps {
  onClose: () => void
}

export default function ActivityWheel({ onClose }: ActivityWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const wheelRef = useRef<HTMLDivElement | null>(null)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    const randomIndex = Math.floor(Math.random() * activities.length)

    // number of full spins (more spins = more dramatic)
    const spins = 6 + Math.floor(Math.random() * 4) // 6-9 full rotations

    const segmentAngle = 360 / activities.length

    // Calculate rotation so the chosen segment's center lands at the top pointer (0deg)
    // We invert because rotate() moves the wheel clockwise, while our pointer is fixed at top.
    const offsetToCenter = segmentAngle / 2
    const targetFromTop = (randomIndex * segmentAngle) + offsetToCenter
    const rotationDegrees = spins * 360 + (360 - targetFromTop)

    const wheelEl = wheelRef.current
    if (!wheelEl) return

    // Apply transition and rotation
    wheelEl.style.transition = `transform 4s cubic-bezier(.17,.67,.38,1)`
    wheelEl.style.transform = `rotate(${rotationDegrees}deg)`

    // After transition ends, set selected and reset spinning flag
    const onTransitionEnd = () => {
      setSelectedIndex(randomIndex)
      setIsSpinning(false)
      // keep final rotation in place but remove inline transition so future spins restart cleanly
      wheelEl.style.transition = ""
      wheelEl.removeEventListener("transitionend", onTransitionEnd)
    }

    wheelEl.addEventListener("transitionend", onTransitionEnd)
  }

  const selectedActivity = activities[selectedIndex]

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-8 overflow-y-auto max-h-[90vh] no-scrollbar animate-in zoom-in relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button (prominent) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 p-2 rounded-full shadow-md z-40 focus:outline-none focus:ring-2 focus:ring-red-200"
          aria-label="Close dialog"
        >
          ×
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Activity Wheel</h2>

        <p className="text-center text-gray-700 text-sm sm:text-base mb-6">
          Spin the wheel to discover a fun activity to do with your child!
        </p>

        {/* Wheel container */}
        <div className="flex justify-center mb-8">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full shadow-lg overflow-hidden flex items-center justify-center border-4 border-gray-200 dark:border-gray-800 bg-white">
            <div
              id="activity-wheel"
              ref={wheelRef}
              className="absolute inset-0"
              style={{
                // build a conic-gradient with evenly spaced HSL colors for clear segments
                background: `conic-gradient(${activities
                  .map((_, i) => {
                    const start = (i / activities.length) * 360
                    const end = ((i + 1) / activities.length) * 360
                    const hue = Math.round((i / activities.length) * 360)
                    return `hsl(${hue} 80% 60%) ${start}deg ${end}deg`
                  })
                  .join(", ")})`,
                transform: `rotate(0deg)`,
              }}
            >
              {/* Wheel segments - emojis placed around using percentage translate so it's responsive */}
              {activities.map((activity, index) => {
                const segmentAngle = 360 / activities.length
                // center angle for this segment
                const angleCenter = (index / activities.length) * 360 + segmentAngle / 2
                const translateDistance = "-46%"
                return (
                  <div
                    key={index}
                    className="absolute w-full h-full flex items-center justify-center pointer-events-none"
                    style={{
                      transform: `rotate(${angleCenter}deg) translateY(${translateDistance})`,
                    }}
                  >
                    <div
                      style={{ transform: `rotate(${-angleCenter}deg)` }}
                      className="text-2xl drop-shadow-lg bg-white/80 rounded-full p-1"
                    >
                      {activity.emoji}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pointer at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 z-20">
              <div className="w-0 h-0 border-l-7 border-r-7 border-t-12 border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Spin button */}
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all text-base sm:text-lg mb-6 active:scale-95"
        >
          {isSpinning ? "Spinning..." : "SPIN THE WHEEL"}
        </button>

        {/* Selected activity */}
        {!isSpinning && (
          <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200 animate-in fade-in">
            <div className="text-5xl text-center mb-4">{selectedActivity.emoji}</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-2">{selectedActivity.name}</h3>
            <p className="text-gray-700 text-center text-sm sm:text-base">{selectedActivity.description}</p>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
        >
          Close
        </button>
      </div>
    </div>
  )
}
