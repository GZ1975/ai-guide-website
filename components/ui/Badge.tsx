import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'gold' | 'success' | 'info' | 'warning' | 'unit3' | 'unit4' | 'unit5'
  className?: string
}

const variants = {
  default: 'bg-slate-100 text-slate-700',
  gold: 'bg-gold-100 text-gold-700 border border-gold-300',
  success: 'bg-emerald-100 text-emerald-700',
  info: 'bg-blue-100 text-blue-700',
  warning: 'bg-orange-100 text-orange-700',
  unit3: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  unit4: 'bg-blue-100 text-blue-700 border border-blue-200',
  unit5: 'bg-purple-100 text-purple-700 border border-purple-200',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
