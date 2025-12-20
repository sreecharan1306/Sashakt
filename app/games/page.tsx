"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import TicTacToe from "@/components/tic-tac-toe"
import WordUnscramble from "@/components/word-unscramble"
import PuzzleCraft from "@/components/puzzle-craft"
import MemoryMatch from "@/components/memory-match"
import NumberSequence from "@/components/number-sequence"

type GameType = "tictactoe" | "unscramble" | "puzzle" | "memory" | "sequence" | null

const GAMES = [
  { id: "tictactoe", name: "Tic Tac Toe", description: "Classic game of Xs and Os" },
  { id: "unscramble", name: "Word Unscramble", description: "Unscramble letters to find words" },
  { id: "puzzle", name: "Puzzle Craft", description: "Drag and drop puzzle pieces" },
  { id: "memory", name: "Memory Match", description: "Match pairs of emojis" },
  { id: "sequence", name: "Number Sequence", description: "Remember and repeat sequences" },
]

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<GameType>(null)
  const { ref, isVisible } = useScrollAnimation()

  const renderGame = () => {
    switch (selectedGame) {
      case "tictactoe":
        return <TicTacToe />
      case "unscramble":
        return <WordUnscramble />
      case "puzzle":
        return <PuzzleCraft />
      case "memory":
        return <MemoryMatch />
      case "sequence":
        return <NumberSequence />
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen flex flex-col">


      <div className="flex-grow bg-gradient-to-br from-purple-500 via-pink-400 to-blue-400 px-4 md:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {selectedGame ? (
            <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 scale-in">
              <button
                onClick={() => setSelectedGame(null)}
                className="mb-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold btn-hover"
              >
                Back to Games
              </button>
              {renderGame()}
            </div>
          ) : (
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 drop-shadow-lg fade-in-down">
                Explore Our Games
              </h1>
              <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {GAMES.map((game, index) => (
                  <div
                    key={game.id}
                    onClick={() => setSelectedGame(game.id as GameType)}
                    className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer game-card ${
                      isVisible ? "fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{game.name}</h3>
                    <p className="text-gray-600 mb-4">{game.description}</p>
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold btn-hover">
                      Play Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>


    </main>
  )
}
