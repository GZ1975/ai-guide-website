import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { englishCurriculum } from '@/data/english-curriculum'
import { englishQuestions } from '@/data/english-questions'
import type { UnitLevel } from '@/types'
import VideoPlayer from '@/components/lesson/VideoPlayer'
import QuizEngine from '@/components/quiz/QuizEngine'
import { ChevronLeft, Target, Clock, BookOpen } from 'lucide-react'

interface Props { params: { unit: string; topic: string } }

export function generateStaticParams() {
  return englishCurriculum.units.flatMap((u) =>
    u.topics.map((t) => ({ unit: String(u.level), topic: t.id }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const unit = englishCurriculum.units.find((u) => u.level === Number(params.unit))
  const topic = unit?.topics.find((t) => t.id === params.topic)
  if (!topic) return {}
  return {
    title: `${topic.title} – English ${params.unit} Units | מכינה לבגרות`,
    description: topic.description,
  }
}

const moduleLabels: Record<number, string> = { 3: 'Module D', 4: 'Module E', 5: 'Module F' }

export default function EnglishTopicPage({ params }: Props) {
  const unitLevel = Number(params.unit) as UnitLevel
  const unitData = englishCurriculum.units.find((u) => u.level === unitLevel)
  const topic = unitData?.topics.find((t) => t.id === params.topic)
  if (!topic || !unitData) notFound()

  const topicQuestions = englishQuestions.filter((q) => q.topicId === topic.id)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-l from-emerald-600 to-teal-900 text-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">בית</Link>
            <ChevronLeft className="w-3 h-3" />
            <Link href="/english" className="hover:text-white transition-colors">אנגלית</Link>
            <ChevronLeft className="w-3 h-3" />
            <span>{moduleLabels[unitLevel]}</span>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-white">{topic.title}</span>
          </div>
          <h1 className="text-3xl font-black mb-2 ltr-only">{topic.title}</h1>
          <p className="text-slate-300 max-w-xl ltr-only">{topic.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5 ltr-only">
              <Clock className="w-4 h-4" />
              {topic.duration} min
            </span>
            <span className="flex items-center gap-1.5 ltr-only">
              <BookOpen className="w-4 h-4" />
              {moduleLabels[unitLevel]}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section>
          <h2 className="text-xl font-bold text-navy-600 mb-4">🎬 Lesson Video</h2>
          <VideoPlayer topic={topic} />
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-navy-600 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-gold-500" />
            <span className="ltr-only">Learning Objectives</span>
          </h2>
          <ul className="space-y-3">
            {topic.objectives.map((obj) => (
              <li key={obj} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full
                                 flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                <span className="text-slate-700 ltr-only">{obj}</span>
              </li>
            ))}
          </ul>
        </section>

        {topicQuestions.length > 0 ? (
          <section>
            <h2 className="text-xl font-bold text-navy-600 mb-4 ltr-only">📝 Practice – Bagrut-Style Questions</h2>
            <QuizEngine
              questions={topicQuestions}
              subject="english"
              unit={unitLevel}
              topicId={topic.id}
              topicTitle={topic.title}
            />
          </section>
        ) : (
          <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
            <p className="text-emerald-600 font-medium ltr-only">
              Practice questions for this topic are coming soon!
            </p>
            <Link href={`/quiz/english/${unitLevel}`} className="mt-3 btn-secondary inline-flex items-center gap-2">
              Go to general quiz
            </Link>
          </section>
        )}
      </div>
    </div>
  )
}
