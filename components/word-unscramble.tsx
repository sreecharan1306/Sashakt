"use client"

import { useState } from "react"

const WORDS = [
  { scrambled: "RAINGBO", answer: "RAINBOW", hint: "Seven colors in the sky" },
  { scrambled: "RISHOTNU", answer: "DINOSAUR", hint: "Extinct prehistoric animal" },
  { scrambled: "UTSECNAML", answer: "DOCUMENTS", hint: "Papers or records" },
  { scrambled: "TBUERFFLY", answer: "BUTTERFLY", hint: "Beautiful winged insect" },
  { scrambled: "AIZPZ", answer: "PIZZA", hint: "Italian food with cheese" },
]

export default function WordUnscramble() {
  const [currentWord, setCurrentWord] = useState(0)
  const [input, setInput] = useState("")
  const [message, setMessage] = useState("")
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const word = WORDS[currentWord]

  const handleSubmit = () => {
    if (input.toUpperCase() === word.answer) {
      setMessage("Correct!")
      setScore(score + 10)
      setTimeout(() => {
        if (currentWord < WORDS.length - 1) {
          setCurrentWord(currentWord + 1)
          setInput("")
          setMessage("")
        } else {
          setGameOver(true)
        }
      }, 1500)
    } else {
      setMessage("Wrong! Try again.")
      setInput("")
    }
  }

  const skipWord = () => {
    if (currentWord < WORDS.length - 1) {
      setCurrentWord(currentWord + 1)
      setInput("")
      setMessage("")
    } else {
      setGameOver(true)
    }
  }

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-6">
        <h2 className="text-3xl font-bold text-gray-800">Game Over!</h2>
        <p className="text-2xl font-bold text-blue-600">Final Score: {score}</p>
        <button
          onClick={() => {
            setCurrentWord(0)
            setInput("")
            setMessage("")
            setScore(0)
            setGameOver(false)
          }}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
        >
          Play Again
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <h2 className="text-3xl font-bold text-gray-800">Unscramble the Word</h2>
      <p className="text-lg text-gray-600">Score: {score}</p>

      <div className="bg-yellow-100 p-6 rounded-lg shadow-lg text-center">
        <p className="text-2xl font-bold text-yellow-800 tracking-widest mb-4">{word.scrambled}</p>
        <p className="text-gray-700">Hint: {word.hint}</p>
      </div>

      <div className="flex gap-2 w-full max-w-xs">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Type your answer"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
        >
          Submit
        </button>
      </div>

      {message && (
        <p className={`text-lg font-bold ${message === "Correct!" ? "text-green-600" : "text-red-600"}`}>{message}</p>
      )}

      <button onClick={skipWord} className="text-gray-600 hover:text-gray-800 underline">
        Skip
      </button>
    </div>
  )
}
