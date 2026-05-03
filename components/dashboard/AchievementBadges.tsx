'use client'
import { motion } from 'framer-motion'
import { useProgressStore } from '@/lib/store'
import { achievements } from '@/data/achievements'
import { cn } from '@/lib/utils'
import { Lock } from 'lucide-react'

export default function AchievementBadges() {
  const { progress } = useProgressStore()
  const unlocked = progress.achievements

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-navy-600">הישגים</h3>
        <span className="text-sm text-slate-500">
          {unlocked.length} / {achievements.length}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {achievements.map((ach, i) => {
          const isUnlocked = unlocked.includes(ach.id)
          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              title={ach.description}
              className={cn(
                'relative flex flex-col items-center p-3 rounded-xl text-center transition-all',
                isUnlocked
                  ? 'bg-gold-50 border-2 border-gold-300 shadow-md'
                  : 'bg-slate-50 border-2 border-slate-200 opacity-50'
              )}
            >
              {!isUnlocked && (
                <div className="absolute top-2 left-2">
                  <Lock className="w-3 h-3 text-slate-400" />
                </div>
              )}
              <span className={cn('text-3xl mb-2', !isUnlocked && 'grayscale')}>{ach.icon}</span>
              <p className="text-xs font-bold text-slate-700 leading-tight">{ach.title}</p>
              {isUnlocked && (
                <span className="mt-1 text-xs text-gold-600 font-medium">✓ הושג</span>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
