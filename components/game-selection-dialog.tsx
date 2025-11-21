"use client"

import { useState } from "react"
import Link from "next/link"
import TicTacToe from "./tic-tac-toe"
import WordUnscramble from "./word-unscramble"
import MemoryMatch from "./memory-match"
import NumberSequence from "./number-sequence"

type GameType = "tictactoe" | "unscramble" | "memory" | "sequence" | null

const RANDOM_GAMES = [
  { id: "tictactoe", name: "Tic Tac Toe", component: TicTacToe },
  { id: "unscramble", name: "Word Unscramble", component: WordUnscramble },
  { id: "memory", name: "Memory Match", component: MemoryMatch },
  { id: "sequence", name: "Number Sequence", component: NumberSequence },
]

interface GameSelectionDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function GameSelectionDialog({ isOpen, onClose }: GameSelectionDialogProps) {
  const [selectedGame, setSelectedGame] = useState<GameType>(null)
  const [randomGame] = useState(() => RANDOM_GAMES[Math.floor(Math.random() * RANDOM_GAMES.length)])

  if (!isOpen) return null

  const handleSelectRandom = () => {
    setSelectedGame(randomGame.id as GameType)
  }

  const handleExplore = () => {
    onClose()
  }

  const renderSelectedGame = () => {
    const game = RANDOM_GAMES.find((g) => g.id === selectedGame)
    if (!game) return null
    const Component = game.component
    return <Component />
  }

  if (selectedGame) {
    return (
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl dark:shadow-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200 dark:border-gray-800 animate-in zoom-in transition-colors duration-300">
          <button
            onClick={() => setSelectedGame(null)}
            className="mb-6 px-4 py-2 bg-gray-500 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-600 dark:hover:bg-gray-600 transition-all duration-300 font-semibold btn-hover"
          >
            Back
          </button>
          {renderSelectedGame()}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl dark:shadow-3xl p-6 md:p-8 max-w-md w-full border-2 border-gray-200 dark:border-gray-800 animate-in zoom-in transition-colors duration-300">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Choose Your Adventure
        </h2>

        <div className="space-y-4 mb-8">
          <button
            onClick={handleSelectRandom}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-all font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 duration-300"
          >
            🎮 Play Random Game
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">or</span>
            </div>
          </div>

          <Link href="/games" onClick={onClose}>
            <button className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-lg transition-all font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 duration-300">
              🕹️ Explore All Games
            </button>
          </Link>
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-all font-semibold btn-hover"
        >
          Close
        </button>
      </div>
    </div>
  )
}
