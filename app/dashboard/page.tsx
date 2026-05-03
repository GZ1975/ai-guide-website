'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useProgressStore } from '@/lib/store'
import ProgressPanel from '@/components/dashboard/ProgressPanel'
import AchievementBadges from '@/components/dashboard/AchievementBadges'
import { mathCurriculum } from '@/data/math-curriculum'
import { englishCurriculum } from '@/data/english-curriculum'
import { getTopicProgress } from '@/lib/utils'
import ProgressBar from '@/components/ui/ProgressBar'
import { ArrowLeft, RotateCcw } from 'lucide-react'

export default function DashboardPage() {
  const { progress, resetProgress } = useProgressStore()

  const recentResults = [...progress.quizResults]
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, 5)

  function handleReset() {
    if (window.confirm('האם לאפס את כל ההתקדמות? פעולה זו אינה ניתנת לביטול.')) {
      resetProgress()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-l from-navy-700 to-navy-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl font-black mb-2">לוח הבקרה שלי</h1>
          <p className="text-slate-400">עקוב אחר ההתקדמות, ההישגים והציונים שלך</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: progress */}
          <div className="lg:col-span-1">
            <ProgressPanel />
          </div>

          {/* Right: details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Recent quiz results */}
            {recentResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h3 className="font-bold text-navy-600 mb-4">חידונים אחרונים</h3>
                <div className="space-y-3">
                  {recentResults.map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="font-medium text-slate-700 text-sm">{r.topicId}</p>
                        <p className="text-xs text-slate-400">
                          {r.subject === 'math' ? 'מתמטיקה' : 'אנגלית'} · {r.unit} יחידות
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-black text-lg ${r.percentage >= 70 ? 'text-emerald-500' : r.percentage >= 50 ? 'text-gold-500' : 'text-red-500'}`}>
                          {r.percentage}%
                        </p>
                        <p className="text-xs text-slate-400">+{r.xpEarned} XP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Topic progress – Math */}
            {[mathCurriculum, englishCurriculum].map((curr) => (
              <motion.div
                key={curr.subject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-navy-600">
                    {curr.subject === 'math' ? '📐 מתמטיקה' : '📖 אנגלית'} – נושאים
                  </h3>
                  <Link
                    href={`/${curr.subject}`}
                    className="text-sm text-navy-600 hover:text-gold-500 transition-colors flex items-center gap-1"
                  >
                    המשך ללמוד <ArrowLeft className="w-3 h-3" />
                  </Link>
                </div>
                {curr.units.map((u) => (
                  <div key={u.level} className="mb-4">
                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                      {u.level} יחידות
                    </p>
                    <div className="space-y-2">
                      {u.topics.map((t) => {
                        const pct = getTopicProgress(progress, t.id)
                        return (
                          <Link key={t.id} href={`/${curr.subject}/${u.level}/${t.id}`}>
                            <div className="flex items-center gap-3 group hover:bg-slate-50 rounded-xl p-2 transition-colors cursor-pointer">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-slate-700 group-hover:text-navy-600 mb-1">
                                  {t.title}
                                </p>
                                <ProgressBar value={pct} size="sm" color={pct >= 100 ? 'green' : 'blue'} />
                              </div>
                              <span className="text-xs text-slate-400 w-8 text-left flex-shrink-0">{pct}%</span>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}

            {/* Achievements */}
            <AchievementBadges />

            {/* Reset */}
            <div className="text-center pt-4">
              <button
                onClick={handleReset}
                className="text-slate-400 hover:text-red-500 text-sm flex items-center gap-1.5 mx-auto transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                אפס התקדמות
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
