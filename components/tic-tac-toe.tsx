"use client"

import { useState } from "react"

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? "X" : "O"
    setBoard(newBoard)

    const gameWinner = calculateWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      setGameOver(true)
    } else if (newBoard.every((square) => square !== null)) {
      setGameOver(true)
    }

    setIsXNext(!isXNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setGameOver(false)
    setWinner(null)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <h2 className="text-3xl font-bold text-gray-800">Tic Tac Toe</h2>

      <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-lg shadow-lg">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 bg-blue-100 border-2 border-blue-500 text-3xl font-bold hover:bg-blue-200 transition-colors text-blue-700"
          >
            {value}
          </button>
        ))}
      </div>

      <div className="text-center">
        {winner ? (
          <p className="text-2xl font-bold text-green-600">Player {winner} Wins!</p>
        ) : gameOver ? (
          <p className="text-2xl font-bold text-orange-600">It's a Draw!</p>
        ) : (
          <p className="text-lg text-gray-700">
            Current Player: <span className="font-bold">{isXNext ? "X" : "O"}</span>
          </p>
        )}
      </div>

      <button
        onClick={resetGame}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
      >
        Reset Game
      </button>
    </div>
  )
}
