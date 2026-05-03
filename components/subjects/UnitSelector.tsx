'use client'
import { motion } from 'framer-motion'
import type { Subject, UnitLevel } from '@/types'
import { cn } from '@/lib/utils'

interface UnitSelectorProps {
  subject: Subject
  selectedUnit: UnitLevel
  onSelect: (unit: UnitLevel) => void
}

const unitConfig = {
  3: {
    label: '3 יחידות',
    sublabel: 'בסיסי',
    icon: '🥉',
    color: 'border-emerald-400 bg-emerald-50 text-emerald-700',
    activeColor: 'bg-emerald-500 text-white border-emerald-500 shadow-emerald-200',
    desc: 'מתאים לרוב התלמידים. מקנה בסיס איתן לכל המקצוע.',
  },
  4: {
    label: '4 יחידות',
    sublabel: 'מתקדם',
    icon: '🥈',
    color: 'border-blue-400 bg-blue-50 text-blue-700',
    activeColor: 'bg-blue-600 text-white border-blue-600 shadow-blue-200',
    desc: 'לתלמידים שרוצים יתרון אקדמי וגישה לפקולטות נוספות.',
  },
  5: {
    label: '5 יחידות',
    sublabel: 'הרמה הגבוהה',
    icon: '🥇',
    color: 'border-purple-400 bg-purple-50 text-purple-700',
    activeColor: 'bg-purple-600 text-white border-purple-600 shadow-purple-200',
    desc: 'הרמה הגבוהה ביותר. נדרש ללימודי הנדסה, מדעים ורפואה.',
  },
} as const

export default function UnitSelector({ subject, selectedUnit, onSelect }: UnitSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {([3, 4, 5] as UnitLevel[]).map((unit) => {
        const cfg = unitConfig[unit]
        const isActive = selectedUnit === unit
        return (
          <motion.button
            key={unit}
            onClick={() => onSelect(unit)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'flex-1 text-right p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer',
              isActive
                ? cn(cfg.activeColor, 'shadow-lg shadow-' + cfg.activeColor.split('-')[1] + '-200')
                : cn(cfg.color, 'hover:shadow-md')
            )}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{cfg.icon}</span>
              <div>
                <div className="font-black text-lg">{cfg.label}</div>
                <div className={cn('text-xs font-medium', isActive ? 'text-white/80' : 'opacity-70')}>
                  {cfg.sublabel}
                </div>
              </div>
            </div>
            <p className={cn('text-xs leading-relaxed', isActive ? 'text-white/90' : 'opacity-75')}>
              {cfg.desc}
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}
