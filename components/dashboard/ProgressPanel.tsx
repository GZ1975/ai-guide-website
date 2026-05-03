'use client'
import { motion } from 'framer-motion'
import { useProgressStore } from '@/lib/store'
import {
  getLevelTitle, getLevelNumber, getProgressToNextLevel,
  getXPForNextLevel, formatDuration,
} from '@/lib/utils'
import ProgressBar from '@/components/ui/ProgressBar'
import { mathCurriculum } from '@/data/math-curriculum'
import { englishCurriculum } from '@/data/english-curriculum'
import { Flame, Star, BookOpen, CheckCircle, Trophy } from 'lucide-react'

export default function ProgressPanel() {
  const { progress } = useProgressStore()
  const level = getLevelNumber(progress.totalXP)
  const levelTitle = getLevelTitle(progress.totalXP)
  const pctToNext = getProgressToNextLevel(progress.totalXP)
  const xpNext = getXPForNextLevel(progress.totalXP)

  const allTopics = [
    ...mathCurriculum.units.flatMap((u) => u.topics),
    ...englishCurriculum.units.flatMap((u) => u.topics),
  ]
  const completedTopics = allTopics.filter((t) => progress.topicsProgress[t.id]?.completed).length
  const totalTopics = allTopics.length

  const quizAvg = progress.quizResults.length
    ? Math.round(progress.quizResults.reduce((s, r) => s + r.percentage, 0) / progress.quizResults.length)
    : 0

  const stats = [
    { icon: <Star className="w-5 h-5 text-gold-500" />, label: 'ניקוד XP', value: progress.totalXP },
    { icon: <Flame className="w-5 h-5 text-orange-500" />, label: 'רצף ימים', value: progress.streak },
    { icon: <BookOpen className="w-5 h-5 text-blue-500" />, label: 'נושאים שהושלמו', value: `${completedTopics}/${totalTopics}` },
    { icon: <Trophy className="w-5 h-5 text-purple-500" />, label: 'ממוצע חידונים', value: `${quizAvg}%` },
  ]

  return (
    <div className="space-y-6">
      {/* Level card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-l from-navy-700 to-navy-900 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-slate-400 text-sm">הרמה שלך</p>
            <h2 className="text-3xl font-black">רמה {level}</h2>
            <p className="text-gold-400 font-medium">{levelTitle}</p>
          </div>
          <div className="text-5xl animate-float">
            {level < 3 ? '🌱' : level < 5 ? '⭐' : level < 8 ? '🏅' : '🏆'}
          </div>
        </div>
        <ProgressBar
          value={pctToNext}
          label={`${progress.totalXP} XP`}
          showPercent
          color="gold"
          size="md"
        />
        <p className="text-slate-400 text-xs mt-2">
          עוד {xpNext - progress.totalXP} XP לרמה {level + 1}
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              {s.icon}
              <span className="text-xs text-slate-500">{s.label}</span>
            </div>
            <p className="text-2xl font-black text-navy-600">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Subject breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-navy-600 mb-4">התקדמות לפי מקצוע</h3>
        {[mathCurriculum, englishCurriculum].map((curr) => {
          const topics = curr.units.flatMap((u) => u.topics)
          const done = topics.filter((t) => progress.topicsProgress[t.id]?.completed).length
          const pct = topics.length > 0 ? Math.round((done / topics.length) * 100) : 0
          return (
            <div key={curr.subject} className="mb-4 last:mb-0">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">
                  {curr.subject === 'math' ? '📐 מתמטיקה' : '📖 אנגלית'}
                </span>
                <span className="text-slate-500">{done}/{topics.length} נושאים</span>
              </div>
              <ProgressBar
                value={pct}
                color={curr.subject === 'math' ? 'blue' : 'green'}
                showPercent
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
