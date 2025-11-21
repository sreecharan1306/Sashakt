"use client"
import { useState } from "react"

interface QuizData {
  title: string
  questions: Array<{
    question: string
    options: string[]
    correct: number
  }>
}

const quizzes: Record<string, QuizData> = {
  survival: {
    title: "Right to Survival Quiz",
    questions: [
      {
        question: "What are the essential services needed for survival?",
        options: ["Food and shelter only", "Food, healthcare, and shelter", "Education only", "Entertainment"],
        correct: 1,
      },
      {
        question: "Who is responsible for ensuring a child's right to survival?",
        options: ["Only parents", "Only government", "Parents, government, and society", "Only teachers"],
        correct: 2,
      },
      {
        question: "What does healthcare access include?",
        options: ["Only hospitals", "Preventive care and treatment", "Only medicine", "Counseling only"],
        correct: 1,
      },
    ],
  },
  development: {
    title: "Right to Development Quiz",
    questions: [
      {
        question: "Which area of development is important for children?",
        options: [
          "Only mental development",
          "Physical, mental, and social development",
          "Only physical development",
          "Only social development",
        ],
        correct: 1,
      },
      {
        question: "What helps a child develop to their full potential?",
        options: ["Only education", "Education, support, and opportunities", "Only play", "Only family time"],
        correct: 1,
      },
      {
        question: "Who plays a role in a child's development?",
        options: ["Only teachers", "Teachers, parents, and community", "Only parents", "Only peers"],
        correct: 1,
      },
    ],
  },
  protection: {
    title: "Right to Protection Quiz",
    questions: [
      {
        question: "What should children be protected from?",
        options: ["All challenges", "Violence, abuse, and exploitation", "Only physical harm", "Sad emotions"],
        correct: 1,
      },
      {
        question: "What is neglect?",
        options: [
          "Ignoring a child completely",
          "Failing to provide care and attention",
          "Being strict",
          "Setting rules",
        ],
        correct: 1,
      },
      {
        question: "Who should protect children from harm?",
        options: ["Only police", "Adults and authorities", "Only parents", "Only teachers"],
        correct: 1,
      },
    ],
  },
  participation: {
    title: "Right to Participation Quiz",
    questions: [
      {
        question: "What does participation mean?",
        options: ["Playing games", "Being heard and expressing views", "Watching others", "Being silent"],
        correct: 1,
      },
      {
        question: "In what decisions should children participate?",
        options: ["Only school decisions", "Decisions affecting them", "No decisions", "Only family budgets"],
        correct: 1,
      },
      {
        question: "Why is children's participation important?",
        options: [
          "It causes problems",
          "It teaches responsibility and respect",
          "It is a burden",
          "It's not important",
        ],
        correct: 1,
      },
    ],
  },
  education: {
    title: "Right to Education Quiz",
    questions: [
      {
        question: "What should quality education develop?",
        options: ["Only academics", "Personality, talents, and abilities", "Only memory", "Only obedience"],
        correct: 1,
      },
      {
        question: "Who has the right to education?",
        options: ["Only rich children", "Only boys", "Every child", "Only smart children"],
        correct: 2,
      },
      {
        question: "What makes education quality?",
        options: [
          "Strict rules only",
          "Relevant content and supportive environment",
          "Only textbooks",
          "Large classes",
        ],
        correct: 1,
      },
    ],
  },
  health: {
    title: "Right to Health Quiz",
    questions: [
      {
        question: 'What does "highest attainable standard of health" mean?',
        options: ["Perfect health always", "Best possible health care accessible", "Only when sick", "Medicine only"],
        correct: 1,
      },
      {
        question: "What is included in health rights?",
        options: ["Treatment only", "Preventive care and treatment", "Exercise only", "Diet only"],
        correct: 1,
      },
      {
        question: "Who provides health services?",
        options: ["Only parents", "Healthcare providers and government", "Only doctors", "Only hospitals"],
        correct: 1,
      },
    ],
  },
  family: {
    title: "Right to Family Quiz",
    questions: [
      {
        question: "What is a key aspect of family rights?",
        options: ["Knowing parents", "Being separated always", "Having no relationships", "Being alone"],
        correct: 0,
      },
      {
        question: "Why is family important for children?",
        options: ["It is not important", "It provides care, support, and love", "It limits growth", "It is optional"],
        correct: 1,
      },
      {
        question: "What should family provide?",
        options: ["Nothing", "Care, protection, and emotional support", "Only food", "Only rules"],
        correct: 1,
      },
    ],
  },
  expression: {
    title: "Right to Expression Quiz",
    questions: [
      {
        question: "What does freedom of expression include?",
        options: [
          "Only speaking",
          "Thoughts, conscience, and various forms of expression",
          "Only writing",
          "Only listening",
        ],
        correct: 1,
      },
      {
        question: "Can children express their beliefs?",
        options: ["No", "Yes, respectfully", "Only with permission", "Never"],
        correct: 1,
      },
      {
        question: "Why is expression important?",
        options: [
          "It is not important",
          "It builds confidence and identity",
          "It causes problems",
          "It is a distraction",
        ],
        correct: 1,
      },
    ],
  },
}

export function RightsQuiz({ rightKey }: { rightKey: string }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const quiz = quizzes[rightKey]
  if (!quiz) return <div className="text-center text-gray-600 dark:text-gray-300 py-4">Loading quiz...</div>

  const handleAnswerClick = (index: number) => {
    if (answered) return
    setSelectedAnswer(index)
    setAnswered(true)
    if (index === quiz.questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quiz.questions.length) {
      setCurrentQuestion(nextQuestion)
      setAnswered(false)
      setSelectedAnswer(null)
    } else {
      setShowScore(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setAnswered(false)
    setSelectedAnswer(null)
  }

  return (
    <div className="w-full">
      {showScore ? (
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Quiz Complete!
          </h3>
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-2 font-semibold">Your Score</p>
            <p className="text-5xl font-bold text-blue-600 dark:text-yellow-400 animate-bounce">
              {score} / {quiz.questions.length}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">
              {score === quiz.questions.length
                ? "Perfect! You're amazing!"
                : score >= 2
                  ? "Great job! You did well!"
                  : "Good effort! Try again!"}
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="btn-hover bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-lg w-full text-lg"
          >
            Retake Quiz
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mb-6">
            <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-2 text-sm font-semibold">
              <span>
                Question {currentQuestion + 1}/{quiz.questions.length}
              </span>
              <span className="text-blue-600 dark:text-blue-400">
                {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>

          <h3 className="text-gray-800 dark:text-white text-lg font-semibold mb-4">
            {quiz.questions[currentQuestion].question}
          </h3>

          <div className="space-y-3 mb-6">
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={answered}
                className={`w-full p-4 text-left rounded-lg font-semibold transition-all duration-300 transform hover:scale-102 active:scale-95 ${
                  selectedAnswer === index
                    ? index === quiz.questions[currentQuestion].correct
                      ? "bg-green-500 dark:bg-green-600 text-white scale-102 shadow-lg"
                      : "bg-red-500 dark:bg-red-600 text-white scale-102 shadow-lg"
                    : answered && index === quiz.questions[currentQuestion].correct
                      ? "bg-green-500 dark:bg-green-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 shadow-sm hover:shadow-md"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {answered && (
            <button
              onClick={handleNext}
              className="btn-hover w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg transition-all"
            >
              {currentQuestion === quiz.questions.length - 1 ? "See Results" : "Next Question"}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
