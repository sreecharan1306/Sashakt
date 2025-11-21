"use client"

import { useState } from "react"

interface MysteryBoxProps {
  onOpen: () => void
}

export default function MysteryBox({ onOpen }: MysteryBoxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
    onOpen()
    setTimeout(() => setIsOpen(false), 600)
  }

  return (
    <div
      className={`mystery-box ${isOpen ? "open" : ""} cursor-pointer`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={`relative w-32 h-40 md:w-40 md:h-48 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-2xl flex items-center justify-center transform transition-all duration-300 ${
          isHovering ? "scale-110 shadow-3xl -rotate-3 animate-bounce" : "scale-100 hover:shadow-2xl"
        }`}
      >
        {/* Box decorative element */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-blue-400 rounded-full transition-all duration-300"></div>

        {/* Question mark */}
        <div
          className={`text-6xl md:text-7xl font-bold text-white transition-all duration-300 ${
            isHovering ? "opacity-100 animate-bounce" : "opacity-80 animate-pulse"
          }`}
        >
          ?
        </div>

        {/* Gift icon */}
        <div
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 text-4xl transition-all duration-300 ${
            isHovering ? "opacity-100 scale-125 animate-bounce" : "opacity-60 scale-100"
          }`}
        >
          🎁
        </div>
      </div>
    </div>
  )
}
