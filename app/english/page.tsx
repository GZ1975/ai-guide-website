'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import type { UnitLevel } from '@/types'
import { englishCurriculum } from '@/data/english-curriculum'
import UnitSelector from '@/components/subjects/UnitSelector'
import TopicCard from '@/components/subjects/TopicCard'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

const moduleLabels: Record<UnitLevel, string> = {
  3: 'Module D',
  4: 'Module E',
  5: 'Module F',
}

export default function EnglishPage() {
  const [selectedUnit, setSelectedUnit] = useState<UnitLevel>(3)

  const unit = englishCurriculum.units.find((u) => u.level === selectedUnit)!

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-l from-emerald-600 to-teal-900 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">בית</Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-white">אנגלית</span>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-5xl">📖</span>
            <div>
              <h1 className="text-4xl font-black mb-2">אנגלית לבגרות</h1>
              <p className="text-slate-300 text-lg max-w-xl">
                הכנה מלאה לכל מרכיבי הבגרות באנגלית – Module D, E ו-F.
                קריאה, כתיבה, דקדוק, הבנת הנשמע וניתוח ספרות.
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
          <UnitSelector subject="english" selectedUnit={selectedUnit} onSelect={setSelectedUnit} />
        </div>

        {/* Unit info */}
        <motion.div
          key={selectedUnit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white rounded-2xl p-5 shadow-sm border-r-4 border-r-emerald-500 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-black text-xl text-navy-600">{unit.title}</h3>
              <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium">
                {moduleLabels[selectedUnit]}
              </span>
            </div>
            <p className="text-slate-500 text-sm">{unit.description}</p>
          </div>

          {/* Topics */}
          <h2 className="text-xl font-bold text-navy-600 mb-4 ltr-only">
            Topics – {unit.topics.length} learning units
          </h2>
          <div className="space-y-3">
            {unit.topics.map((topic, i) => (
              <TopicCard key={topic.id} topic={topic} index={i} />
            ))}
          </div>

          {/* Quiz CTA */}
          <div className="mt-8 bg-gradient-to-l from-emerald-500 to-teal-800 rounded-2xl p-6 text-white text-center">
            <p className="text-lg font-bold mb-2">Ready to test yourself?</p>
            <p className="text-slate-300 text-sm mb-4">
              {unit.topics.length * 2} questions tailored to {moduleLabels[selectedUnit]} level
            </p>
            <Link
              href={`/quiz/english/${selectedUnit}`}
              className="btn-primary inline-flex items-center gap-2 text-navy-900"
            >
              📝 Start English Quiz
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
