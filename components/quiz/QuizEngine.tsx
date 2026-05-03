'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { QuizQuestion, QuizAttempt, QuizResult, Subject, UnitLevel } from '@/types'
import { useProgressStore } from '@/lib/store'
import { getDifficultyLabel, getDifficultyColor } from '@/lib/utils'
import { Timer, ChevronRight, CheckCircle, XCircle } from 'lucide-react'
import QuizResults from './QuizResults'

interface QuizEngineProps {
  questions: QuizQuestion[]
  subject: Subject
  unit: UnitLevel
  topicId: string
  topicTitle: string
}

export default function QuizEngine({ questions, subject, unit, topicId, topicTitle }: QuizEngineProps) {
  const { recordQuizResult } = useProgressStore()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [attempts, setAttempts] = useState<QuizAttempt[]>([])
  const [timeLeft, setTimeLeft] = useState(60)
  const [timeUsed, setTimeUsed] = useState(0)
  const [finished, setFinished] = useState(false)
  const [result, setResult] = useState<QuizResult | null>(null)

  const currentQ = questions[currentIdx]
  const totalQ = questions.length

  // Timer
  useEffect(() => {
    if (finished || showExplanation) return
    if (timeLeft <= 0) {
      handleTimeout()
      return
    }
    const t = setTimeout(() => {
      setTimeLeft((t) => t - 1)
      setTimeUsed((u) => u + 1)
    }, 1000)
    return () => clearTimeout(t)
  }, [timeLeft, finished, showExplanation])

  const handleTimeout = useCallback(() => {
    if (selectedAnswer !== null) return
    setSelectedAnswer('__timeout__')
    setShowExplanation(true)
    setAttempts((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        userAnswer: '__timeout__',
        correct: false,
        timeSpent: 60,
      },
    ])
  }, [currentQ, selectedAnswer])

  function handleSelect(option: string) {
    if (selectedAnswer !== null) return
    setSelectedAnswer(option)
    setShowExplanation(true)

    const correct = option === String(currentQ.answer)
    setAttempts((prev) => [
      ...prev,
      { questionId: currentQ.id, userAnswer: option, correct, timeSpent: 60 - timeLeft },
    ])
  }

  function handleNext() {
    if (currentIdx < totalQ - 1) {
      setCurrentIdx((i) => i + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setTimeLeft(60)
    } else {
      finishQuiz()
    }
  }

  function finishQuiz() {
    const allAttempts = attempts
    const score = allAttempts.reduce((sum, a) => {
      const q = questions.find((q) => q.id === a.questionId)
      return sum + (a.correct ? (q?.points ?? 5) : 0)
    }, 0)
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0)
    const percentage = Math.round((score / maxScore) * 100)
    const xpEarned = Math.round(percentage / 10) * 5 + (percentage === 100 ? 20 : 0)

    const quizResult: QuizResult = {
      subject,
      unit,
      topicId,
      score,
      maxScore,
      percentage,
      attempts: allAttempts,
      completedAt: new Date().toISOString(),
      xpEarned,
    }

    recordQuizResult(quizResult)
    setResult(quizResult)
    setFinished(true)
  }

  if (finished && result) {
    return <QuizResults result={result} questions={questions} topicTitle={topicTitle} />
  }

  const timerColor = timeLeft > 30 ? 'text-emerald-400' : timeLeft > 10 ? 'text-gold-400' : 'text-red-400'

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 font-medium">
            שאלה {currentIdx + 1} / {totalQ}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full bg-slate-100 ${getDifficultyColor(currentQ.difficulty)}`}>
            {getDifficultyLabel(currentQ.difficulty)}
          </span>
        </div>
        <div className={`flex items-center gap-1.5 font-mono font-bold ${timerColor}`}>
          <Timer className="w-4 h-4" />
          {String(timeLeft).padStart(2, '0')}s
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mb-6">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentIdx
                ? attempts[i]?.correct ? 'bg-emerald-500' : 'bg-red-400'
                : i === currentIdx
                ? 'bg-gold-500'
                : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <div className="flex items-start gap-3 mb-6">
              <span className="flex-shrink-0 w-8 h-8 bg-navy-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                {currentIdx + 1}
              </span>
              <p className="text-navy-900 font-semibold text-lg leading-relaxed ltr-only dir-auto">
                {currentQ.question}
              </p>
            </div>

            {/* Options */}
            {currentQ.options && (
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedAnswer === opt
                  const isCorrect = opt === String(currentQ.answer)
                  const revealed = showExplanation

                  let optClass = 'border-slate-200 bg-slate-50 hover:border-navy-400 hover:bg-navy-50'
                  if (revealed && isCorrect) optClass = 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  else if (revealed && isSelected && !isCorrect) optClass = 'border-red-400 bg-red-50 text-red-700'
                  else if (isSelected) optClass = 'border-navy-500 bg-navy-50'

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      disabled={showExplanation}
                      className={`w-full text-right px-4 py-3 rounded-xl border-2 transition-all duration-200
                                  font-medium text-sm flex items-center justify-between group ${optClass}`}
                    >
                      <span className="ltr-only">{opt}</span>
                      {revealed && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
                      {revealed && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-5 bg-blue-50 border border-blue-200 rounded-xl p-4"
                >
                  <p className="text-sm font-bold text-blue-700 mb-1">הסבר:</p>
                  <p className="text-sm text-blue-800 ltr-only">{currentQ.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-end"
            >
              <button
                onClick={handleNext}
                className="btn-secondary flex items-center gap-2"
              >
                {currentIdx < totalQ - 1 ? 'שאלה הבאה' : 'סיים חידון'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
