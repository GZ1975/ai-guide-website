'use client'
import { useMemo } from 'react'
import Link from 'next/link'
import type { Subject, UnitLevel } from '@/types'
import { mathQuestions } from '@/data/math-questions'
import { englishQuestions } from '@/data/english-questions'
import { mathCurriculum } from '@/data/math-curriculum'
import { englishCurriculum } from '@/data/english-curriculum'
import QuizEngine from '@/components/quiz/QuizEngine'
import { ChevronLeft } from 'lucide-react'

interface Props { params: { subject: string; unit: string } }

export default function QuizPage({ params }: Props) {
  const subject = params.subject as Subject
  const unit = Number(params.unit) as UnitLevel

  const allQuestions = subject === 'math' ? mathQuestions : englishQuestions
  const questions = useMemo(() =>
    allQuestions.filter((q) => q.unit === unit).slice(0, 10),
    [allQuestions, unit]
  )

  const curriculum = subject === 'math' ? mathCurriculum : englishCurriculum
  const unitData = curriculum.units.find((u) => u.level === unit)

  const subjectLabel = subject === 'math' ? 'מתמטיקה' : 'אנגלית'
  const subjectHref = `/${subject}`

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4">😔</p>
          <p className="text-slate-600 mb-4">לא נמצאו שאלות לרמה זו</p>
          <Link href={subjectHref} className="btn-secondary">
            חזרה ל{subjectLabel}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className={`${subject === 'math' ? 'bg-gradient-to-l from-blue-600 to-navy-900' : 'bg-gradient-to-l from-emerald-600 to-teal-900'} text-white py-10`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">בית</Link>
            <ChevronLeft className="w-3 h-3" />
            <Link href={subjectHref} className="hover:text-white transition-colors">{subjectLabel}</Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-white">חידון</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{subject === 'math' ? '📝' : '✍️'}</span>
            <div>
              <h1 className="text-3xl font-black">חידון {subjectLabel}</h1>
              <p className="text-slate-300">
                {unit} יחידות · {questions.length} שאלות ·{' '}
                {unitData?.title ?? ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <QuizEngine
          questions={questions}
          subject={subject}
          unit={unit}
          topicId={`quiz-${subject}-${unit}`}
          topicTitle={`חידון ${subjectLabel} – ${unit} יחידות`}
        />
      </div>
    </div>
  )
}
