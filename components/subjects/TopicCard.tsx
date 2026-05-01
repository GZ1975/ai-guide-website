'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Topic } from '@/types'
import { useProgressStore } from '@/lib/store'
import { getTopicProgress } from '@/lib/utils'
import ProgressBar from '@/components/ui/ProgressBar'
import { Clock, Play, CheckCircle } from 'lucide-react'

interface TopicCardProps {
  topic: Topic
  index: number
}

export default function TopicCard({ topic, index }: TopicCardProps) {
  const { progress } = useProgressStore()
  const pct = getTopicProgress(progress, topic.id)
  const tp = progress.topicsProgress[topic.id]
  const isCompleted = tp?.completed ?? false

  const href = `/${topic.subject}/${topic.unit}/${topic.id}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
    >
      <Link href={href}>
        <div className={`bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300
                         hover:-translate-y-0.5 border-r-4 cursor-pointer group
                         ${isCompleted ? 'border-r-emerald-500' : 'border-r-navy-600'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {isCompleted && <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                <h3 className="font-bold text-navy-600 group-hover:text-gold-500 transition-colors truncate">
                  {topic.title}
                </h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-3">
                {topic.description}
              </p>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {topic.duration} דקות
                </span>
                {tp?.videoWatched && (
                  <span className="text-emerald-500 font-medium">✓ סרטון נצפה</span>
                )}
                {tp?.quizCompleted && (
                  <span className="text-blue-500 font-medium">✓ חידון הושלם</span>
                )}
              </div>
            </div>

            <div className="flex-shrink-0 w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center
                            group-hover:bg-gold-500 transition-colors">
              <Play className="w-4 h-4 text-navy-600 group-hover:text-white transition-colors" />
            </div>
          </div>

          {pct > 0 && (
            <div className="mt-3">
              <ProgressBar value={pct} color={isCompleted ? 'green' : 'blue'} size="sm" showPercent />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
