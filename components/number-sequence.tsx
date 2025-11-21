"use client"

import { useState } from "react"

interface SequenceGame {
  level: number
  sequence: number[]
  userSequence: number[]
  isPlaying: boolean
}

export default function NumberSequence() {
  const [game, setGame] = useState<SequenceGame>({
    level: 1,
    sequence: [],
    userSequence: [],
    isPlaying: false,
  })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const startGame = () => {
    setGame({
      level: 1,
      sequence: [Math.floor(Math.random() * 4)],
      userSequence: [],
      isPlaying: true,
    })
    setScore(0)
    setGameOver(false)
  }

  const handleButtonClick = (num: number) => {
    if (game.isPlaying) return

    const newUserSequence = [...game.userSequence, num]
    setGame((prev) => ({ ...prev, userSequence: newUserSequence }))

    if (newUserSequence[newUserSequence.length - 1] !== game.sequence[newUserSequence.length - 1]) {
      setGameOver(true)
      setGame((prev) => ({ ...prev, isPlaying: false }))
      return
    }

    if (newUserSequence.length === game.sequence.length) {
      const newSequence = [...game.sequence, Math.floor(Math.random() * 4)]
      setGame((prev) => ({
        ...prev,
        sequence: newSequence,
        userSequence: [],
        level: prev.level + 1,
      }))
      setScore(game.level * 10)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <h2 className="text-3xl font-bold text-gray-800">Number Sequence</h2>
      <p className="text-lg text-gray-600">
        Level: {game.level} | Score: {score}
      </p>

      {!game.isPlaying && !gameOver && (
        <button
          onClick={startGame}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg"
        >
          Start Game
        </button>
      )}

      {game.isPlaying && <p className="text-lg text-blue-600 font-semibold animate-pulse">Watch the sequence...</p>}

      <div className="grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleButtonClick(num)}
            disabled={game.isPlaying}
            className={`w-20 h-20 rounded-lg font-bold text-2xl transition-all ${
              num === 0
                ? "bg-red-500 hover:bg-red-600"
                : num === 1
                  ? "bg-blue-500 hover:bg-blue-600"
                  : num === 2
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
            } text-white disabled:opacity-50`}
          >
            {num + 1}
          </button>
        ))}
      </div>

      {gameOver && (
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600 mb-4">Game Over!</p>
          <p className="text-lg text-gray-700 mb-4">Final Score: {score}</p>
          <button
            onClick={startGame}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
