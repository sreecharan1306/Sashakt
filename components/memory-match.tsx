"use client"

import { useState, useEffect } from "react"

interface Card {
  id: number
  emoji: string
  flipped: boolean
  matched: boolean
}

const EMOJIS = ["🎈", "🎉", "🎁", "🎀", "🎯", "🎮", "🎲", "🎪"]

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }))
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameWon(false)
  }

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second])
        setFlipped([])
        if (matched.length + 2 === cards.length) {
          setGameWon(true)
        }
      } else {
        setTimeout(() => setFlipped([]), 600)
      }
      setMoves(moves + 1)
    }
  }, [flipped])

  const handleClick = (id: number) => {
    if (flipped.includes(id) || matched.includes(id)) return
    if (flipped.length < 2) {
      setFlipped([...flipped, id])
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <h2 className="text-3xl font-bold text-gray-800">Memory Match</h2>
      <p className="text-lg text-gray-600">Moves: {moves}</p>

      <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-lg shadow-lg">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleClick(card.id)}
            className={`w-16 h-16 rounded-lg font-bold text-2xl transition-all transform ${
              flipped.includes(card.id) || matched.includes(card.id)
                ? "bg-yellow-300 scale-100"
                : "bg-blue-500 hover:scale-105"
            }`}
          >
            {flipped.includes(card.id) || matched.includes(card.id) ? card.emoji : "?"}
          </button>
        ))}
      </div>

      {gameWon && (
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600 mb-4">You Won! Moves: {moves}</p>
          <button
            onClick={initializeGame}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}
