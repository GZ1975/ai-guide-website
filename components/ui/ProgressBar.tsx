'use client'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercent?: boolean
  color?: 'gold' | 'blue' | 'green' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const colors = {
  gold: 'bg-gold-500',
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  purple: 'bg-purple-500',
}

const sizes = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showPercent,
  color = 'blue',
  size = 'md',
  className,
}: ProgressBarProps) {
  const pct = Math.min(Math.round((value / max) * 100), 100)

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-medium text-slate-600">{label}</span>}
          {showPercent && <span className="text-sm font-bold text-slate-700">{pct}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-slate-200 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-700', colors[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
