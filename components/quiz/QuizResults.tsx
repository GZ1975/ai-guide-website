'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { QuizResult, QuizQuestion } from '@/types'
import { CheckCircle, XCircle, Star, RotateCcw, ArrowRight } from 'lucide-react'

interface QuizResultsProps {
  result: QuizResult
  questions: QuizQuestion[]
  topicTitle: string
}

const gradeEmoji = (pct: number) =>
  pct >= 90 ? '🏆' : pct >= 70 ? '🌟' : pct >= 50 ? '👍' : '📚'

const gradeLabel = (pct: number) =>
  pct >= 90 ? 'מצוין!' : pct >= 70 ? 'טוב מאוד!' : pct >= 50 ? 'עבר' : 'נסה שוב'

const gradeColor = (pct: number) =>
  pct >= 90 ? 'text-emerald-500' : pct >= 70 ? 'text-blue-500' : pct >= 50 ? 'text-gold-500' : 'text-red-500'

export default function QuizResults({ result, questions, topicTitle }: QuizResultsProps) {
  const correctCount = result.attempts.filter((a) => a.correct).length

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      {/* Score card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="text-6xl mb-4"
        >
          {gradeEmoji(result.percentage)}
        </motion.div>

        <h2 className="text-2xl font-black text-navy-600 mb-1">{gradeLabel(result.percentage)}</h2>
        <p className="text-slate-500 mb-6">{topicTitle}</p>

        <div className={`text-6xl font-black mb-2 ${gradeColor(result.percentage)}`}>
          {result.percentage}%
        </div>
        <p className="text-slate-400 text-sm">
          {result.score} / {result.maxScore} נקודות · {correctCount} / {questions.length} תשובות נכונות
        </p>

        {/* XP earned */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5 inline-flex items-center gap-2 bg-gold-50 text-gold-700 border border-gold-200
                     px-5 py-2.5 rounded-xl font-bold"
        >
          <Star className="w-5 h-5" />
          +{result.xpEarned} XP הרווחת!
        </motion.div>
      </div>

      {/* Question review */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h3 className="font-bold text-navy-600 mb-4">סקירת שאלות</h3>
        <div className="space-y-3">
          {questions.map((q, i) => {
            const attempt = result.attempts.find((a) => a.questionId === q.id)
            const correct = attempt?.correct ?? false
            return (
              <div
                key={q.id}
                className={`flex items-start gap-3 p-3 rounded-xl text-sm
                            ${correct ? 'bg-emerald-50' : 'bg-red-50'}`}
              >
                {correct
                  ? <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                <div>
                  <p className="font-medium text-slate-700 ltr-only mb-1">{q.question}</p>
                  {!correct && (
                    <p className="text-xs text-slate-500">
                      תשובה נכונה: <span className="font-bold text-emerald-600 ltr-only">{q.answer}</span>
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => window.location.reload()}
          className="btn-outline flex items-center gap-2 flex-1 justify-center"
        >
          <RotateCcw className="w-4 h-4" />
          נסה שוב
        </button>
        <Link
          href="/dashboard"
          className="btn-secondary flex items-center gap-2 flex-1 justify-center"
        >
          לוח בקרה
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  )
}
