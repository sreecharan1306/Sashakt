"use client"

import type React from "react"

import { useState } from "react"

interface Piece {
  id: number
  position: { x: number; y: number }
  correct: boolean
}

const PUZZLES = [
  {
    name: "Simple Square",
    pieces: 4,
    correctPositions: [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 0, y: 100 },
      { x: 100, y: 100 },
    ],
  },
  {
    name: "Triangle",
    pieces: 3,
    correctPositions: [
      { x: 50, y: 0 },
      { x: 0, y: 100 },
      { x: 100, y: 100 },
    ],
  },
]

export default function PuzzleCraft() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0)
  const [pieces, setPieces] = useState<Piece[]>(
    PUZZLES[0].pieces
      ? Array.from({ length: PUZZLES[0].pieces }, (_, i) => ({
          id: i,
          position: { x: Math.random() * 200, y: Math.random() * 200 },
          correct: false,
        }))
      : [],
  )
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const puzzle = PUZZLES[currentPuzzle]

  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("pieceId", id.toString())
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const pieceId = Number.parseInt(e.dataTransfer.getData("pieceId"))
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const correctPos = puzzle.correctPositions[pieceId]
    const isCorrect = Math.abs(x - correctPos.x) < 30 && Math.abs(y - correctPos.y) < 30

    const newPieces = pieces.map((p) => (p.id === pieceId ? { ...p, position: { x, y }, correct: isCorrect } : p))
    setPieces(newPieces)

    if (isCorrect && !pieces[pieceId].correct) {
      setScore(score + 10)
    }

    if (newPieces.every((p) => p.correct)) {
      setCompleted(true)
    }
  }

  const resetPuzzle = () => {
    setPieces(
      Array.from({ length: puzzle.pieces }, (_, i) => ({
        id: i,
        position: { x: Math.random() * 200, y: Math.random() * 200 },
        correct: false,
      })),
    )
    setScore(0)
    setCompleted(false)
  }

  const nextPuzzle = () => {
    if (currentPuzzle < PUZZLES.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1)
      setPieces(
        Array.from({ length: PUZZLES[currentPuzzle + 1].pieces }, (_, i) => ({
          id: i,
          position: { x: Math.random() * 200, y: Math.random() * 200 },
          correct: false,
        })),
      )
      setCompleted(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <h2 className="text-3xl font-bold text-gray-800">{puzzle.name}</h2>
      <p className="text-lg text-gray-600">Score: {score}</p>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-400 rounded-lg shadow-lg overflow-hidden"
      >
        {pieces.map((piece) => (
          <div
            key={piece.id}
            draggable
            onDragStart={(e) => handleDragStart(e, piece.id)}
            className={`absolute w-16 h-16 rounded-lg cursor-grab flex items-center justify-center text-white font-bold text-lg transition-all ${
              piece.correct ? "bg-green-500 opacity-100" : "bg-blue-500 opacity-75 hover:opacity-100"
            }`}
            style={{
              left: `${piece.position.x}px`,
              top: `${piece.position.y}px`,
            }}
          >
            {piece.id + 1}
          </div>
        ))}
      </div>

      {completed && (
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600 mb-4">Puzzle Complete!</p>
          {currentPuzzle < PUZZLES.length - 1 ? (
            <button
              onClick={nextPuzzle}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Next Puzzle
            </button>
          ) : (
            <p className="text-lg text-green-700">All puzzles completed!</p>
          )}
        </div>
      )}

      {!completed && (
        <button
          onClick={resetPuzzle}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
        >
          Reset
        </button>
      )}
    </div>
  )
}
