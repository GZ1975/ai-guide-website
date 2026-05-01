'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import type { UnitLevel } from '@/types'
import { mathCurriculum } from '@/data/math-curriculum'
import UnitSelector from '@/components/subjects/UnitSelector'
import TopicCard from '@/components/subjects/TopicCard'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function MathPage() {
  const [selectedUnit, setSelectedUnit] = useState<UnitLevel>(3)

  const unit = mathCurriculum.units.find((u) => u.level === selectedUnit)!

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-l from-blue-600 to-navy-900 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">בית</Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-white">מתמטיקה</span>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-5xl">📐</span>
            <div>
              <h1 className="text-4xl font-black mb-2">מתמטיקה לבגרות</h1>
              <p className="text-slate-300 text-lg max-w-xl">
                הכנה מקיפה לכל שאלוני הבגרות – מ-3 יחידות (שאלון 035381) ועד 5 יחידות (שאלון 035383).
                כולל סרטוני AI, תרגול ושאלונים.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Unit selector */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-navy-600 mb-4">בחר רמת לימוד</h2>
          <UnitSelector subject="math" selectedUnit={selectedUnit} onSelect={setSelectedUnit} />
        </div>

        {/* Unit info */}
        <motion.div
          key={selectedUnit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white rounded-2xl p-5 shadow-sm border-r-4 border-r-blue-500 mb-6">
            <h3 className="font-black text-xl text-navy-600 mb-1">{unit.title}</h3>
            <p className="text-slate-500 text-sm">{unit.description}</p>
          </div>

          {/* Topics */}
          <h2 className="text-xl font-bold text-navy-600 mb-4">
            נושאים – {unit.topics.length} יחידות תוכן
          </h2>
          <div className="space-y-3">
            {unit.topics.map((topic, i) => (
              <TopicCard key={topic.id} topic={topic} index={i} />
            ))}
          </div>

          {/* Quiz CTA */}
          <div className="mt-8 bg-gradient-to-l from-blue-500 to-navy-700 rounded-2xl p-6 text-white text-center">
            <p className="text-lg font-bold mb-2">מוכן לבחן את עצמך?</p>
            <p className="text-slate-300 text-sm mb-4">
              {unit.topics.length * 2} שאלות מותאמות לרמת {selectedUnit} יחידות
            </p>
            <Link
              href={`/quiz/math/${selectedUnit}`}
              className="btn-primary inline-flex items-center gap-2 text-navy-900"
            >
              📝 התחל חידון מתמטיקה
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
