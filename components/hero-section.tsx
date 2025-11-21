"use client"

import { useState } from "react"
import MysteryBox from "./mystery-box"
import GameSelectionDialog from "./game-selection-dialog"

export default function HeroSection() {
  const [showSurprise, setShowSurprise] = useState(false)
  const [surpriseText, setSurpriseText] = useState("")
  const [showGameDialog, setShowGameDialog] = useState(false)

  const surprises = [
    "🎉 You are awesome!",
    "🚀 Keep pushing your limits!",
    "💪 You got this!",
    "⭐ You are a star!",
    "🏆 Champion in the making!",
    "🌟 Shine bright!",
  ]

  const handleBoxClick = () => {
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)]
    setSurpriseText(randomSurprise)
    setShowSurprise(true)
    setShowGameDialog(true)
    setTimeout(() => setShowSurprise(false), 3000)
  }

  return (
    <section className="hero-background flex-grow relative overflow-hidden">
      {/* Decorative hand elements background */}
      <div className="absolute inset-0 flex items-center justify-between opacity-30 pointer-events-none">
        <div className="text-9xl transform -rotate-12">👋</div>
        <div className="text-9xl transform rotate-12">👋</div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] px-6 text-center">
        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white dark:text-white mb-6 max-w-4xl leading-tight drop-shadow-lg">
          Are you ready to enhance your skills and take it to the next level?
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white dark:text-gray-100 mb-12 max-w-2xl drop-shadow-md">
          Click on the mystery box below to get a surprise
        </p>

        {/* Mystery Box */}
        <MysteryBox onOpen={handleBoxClick} />

        {/* Surprise message */}
        {showSurprise && (
          <div className="mt-8 animate-bounce">
            <p className="text-3xl md:text-4xl font-bold text-yellow-300 dark:text-yellow-300 drop-shadow-lg">
              {surpriseText}
            </p>
          </div>
        )}
      </div>

      {/* Game Selection Dialog */}
      <GameSelectionDialog isOpen={showGameDialog} onClose={() => setShowGameDialog(false)} />
    </section>
  )
}
