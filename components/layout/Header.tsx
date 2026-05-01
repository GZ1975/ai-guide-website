'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useProgressStore } from '@/lib/store'
import { getLevelTitle, getLevelNumber } from '@/lib/utils'
import { BookOpen, BarChart2, Menu, X, Star, Flame } from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { progress } = useProgressStore()
  const levelTitle = getLevelTitle(progress.totalXP)
  const level = getLevelNumber(progress.totalXP)

  const navLinks = [
    { href: '/math', label: 'מתמטיקה', icon: '📐' },
    { href: '/english', label: 'אנגלית', icon: '📖' },
    { href: '/dashboard', label: 'לוח בקרה', icon: '📊' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-navy-900 shadow-xl border-b border-navy-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gold-500 rounded-xl flex items-center justify-center
                            group-hover:bg-gold-400 transition-colors">
              <BookOpen className="w-5 h-5 text-navy-900" />
            </div>
            <span className="text-white font-black text-xl tracking-tight">
              מכינה<span className="text-gold-400">לבגרות</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-300
                           hover:text-white hover:bg-navy-700 transition-all text-sm font-medium"
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* XP / Level badge */}
          <div className="hidden md:flex items-center gap-3">
            {progress.streak > 0 && (
              <div className="flex items-center gap-1 bg-orange-500/20 text-orange-300 px-3 py-1.5 rounded-xl text-sm font-bold">
                <Flame className="w-4 h-4" />
                {progress.streak}
              </div>
            )}
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-gold-500/20 hover:bg-gold-500/30
                         text-gold-300 px-3 py-1.5 rounded-xl transition-all"
            >
              <Star className="w-4 h-4" />
              <span className="text-sm font-bold">{progress.totalXP} XP</span>
              <span className="text-xs opacity-75">רמה {level} · {levelTitle}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-navy-700 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-800 border-t border-navy-700 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-200
                         hover:bg-navy-700 transition-colors"
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-navy-700 flex items-center gap-2 px-4 py-2">
            <Star className="w-4 h-4 text-gold-400" />
            <span className="text-gold-300 text-sm font-bold">{progress.totalXP} XP · רמה {level}</span>
          </div>
        </div>
      )}
    </header>
  )
}
