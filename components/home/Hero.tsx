'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Calculator, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden min-h-[88vh] flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-700/20 rounded-full blur-3xl" />
        {/* Floating shapes */}
        {['📐', '📖', '✏️', '🎯', '⭐', '📊'].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-20 animate-float"
            style={{
              top: `${15 + i * 13}%`,
              left: `${5 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.3}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 border border-gold-500/30
                     px-4 py-2 rounded-full text-sm font-medium mb-8"
        >
          <Star className="w-4 h-4" />
          מאושר לפי תכנית משרד החינוך והמועצה להשכלה גבוהה
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
        >
          הכנה מושלמת
          <br />
          <span className="gradient-text">לבגרות</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          מתמטיקה ואנגלית לבגרות – מ-3 עד 5 יחידות. שיעורים מרהיבים עם AI,
          שאלונים מותאמים לרמת הבגרות, ולוח התקדמות אישי.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/math"
            className="btn-primary flex items-center gap-2 text-navy-900 text-lg"
          >
            <Calculator className="w-5 h-5" />
            התחל במתמטיקה
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link
            href="/english"
            className="btn-outline flex items-center gap-2 !border-gold-400 !text-gold-300
                       hover:!bg-gold-500 hover:!text-navy-900 text-lg"
          >
            <BookOpen className="w-5 h-5" />
            התחל באנגלית
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { value: '3–5', label: 'יחידות לימוד', emoji: '📚' },
            { value: '50+', label: 'נושאי לימוד', emoji: '📋' },
            { value: '200+', label: 'שאלות בגרות', emoji: '✅' },
            { value: '100%', label: 'לפי משרד החינוך', emoji: '🎓' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 text-center"
            >
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
