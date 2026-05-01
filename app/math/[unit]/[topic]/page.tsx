import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { mathCurriculum } from '@/data/math-curriculum'
import { mathQuestions } from '@/data/math-questions'
import type { UnitLevel } from '@/types'
import VideoPlayer from '@/components/lesson/VideoPlayer'
import QuizEngine from '@/components/quiz/QuizEngine'
import { ChevronLeft, Target, Clock, BookOpen } from 'lucide-react'

interface Props { params: { unit: string; topic: string } }

export function generateStaticParams() {
  return mathCurriculum.units.flatMap((u) =>
    u.topics.map((t) => ({ unit: String(u.level), topic: t.id }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const unit = mathCurriculum.units.find((u) => u.level === Number(params.unit))
  const topic = unit?.topics.find((t) => t.id === params.topic)
  if (!topic) return {}
  return {
    title: `${topic.title} – מתמטיקה ${params.unit} יחידות | מכינה לבגרות`,
    description: topic.description,
  }
}

export default function MathTopicPage({ params }: Props) {
  const unitLevel = Number(params.unit) as UnitLevel
  const unitData = mathCurriculum.units.find((u) => u.level === unitLevel)
  const topic = unitData?.topics.find((t) => t.id === params.topic)
  if (!topic || !unitData) notFound()

  const topicQuestions = mathQuestions.filter(
    (q) => q.topicId === topic.id
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb header */}
      <div className="bg-gradient-to-l from-blue-600 to-navy-900 text-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">בית</Link>
            <ChevronLeft className="w-3 h-3" />
            <Link href="/math" className="hover:text-white transition-colors">מתמטיקה</Link>
            <ChevronLeft className="w-3 h-3" />
            <span>{unitLevel} יחידות</span>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-white">{topic.title}</span>
          </div>
          <h1 className="text-3xl font-black mb-2">{topic.title}</h1>
          <p className="text-slate-300 max-w-xl">{topic.description}</p>

          <div className="flex items-center gap-4 mt-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {topic.duration} דקות
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              {unitLevel} יחידות
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Video */}
        <section>
          <h2 className="text-xl font-bold text-navy-600 mb-4">🎬 סרטון הסבר</h2>
          <VideoPlayer topic={topic} />
        </section>

        {/* Objectives */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-navy-600 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-gold-500" />
            מטרות הלמידה
          </h2>
          <ul className="space-y-3">
            {topic.objectives.map((obj) => (
              <li key={obj} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full
                                 flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                <span className="text-slate-700">{obj}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Quiz */}
        {topicQuestions.length > 0 ? (
          <section>
            <h2 className="text-xl font-bold text-navy-600 mb-4">📝 תרגול – שאלות בגרות</h2>
            <QuizEngine
              questions={topicQuestions}
              subject="math"
              unit={unitLevel}
              topicId={topic.id}
              topicTitle={topic.title}
            />
          </section>
        ) : (
          <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
            <p className="text-blue-600 font-medium">
              שאלות תרגול לנושא זה בהכנה – עלו בקרוב!
            </p>
            <Link
              href={`/quiz/math/${unitLevel}`}
              className="mt-3 btn-secondary inline-flex items-center gap-2"
            >
              עבור לחידון כללי
            </Link>
          </section>
        )}
      </div>
    </div>
  )
}
