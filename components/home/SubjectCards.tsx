'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'

const subjects = [
  {
    href: '/math',
    emoji: '📐',
    title: 'מתמטיקה',
    subtitle: 'שאלון 035381 / 035382 / 035383',
    description: 'מ-3 עד 5 יחידות: אלגברה, גאומטריה, טריגונומטריה, חדו"א ועוד. כל נושא בסרטון מרהיב עם תרגול מותאם.',
    units: ['3 יחידות', '4 יחידות', '5 יחידות'],
    unitVariants: ['unit3', 'unit4', 'unit5'] as const,
    color: 'from-blue-500 to-navy-600',
    topics: ['אלגברה', 'גאומטריה', 'טריגונומטריה', 'חדו"א', 'סטטיסטיקה', 'הסתברות'],
  },
  {
    href: '/english',
    emoji: '📖',
    title: 'אנגלית',
    subtitle: 'Module D / E / F',
    description: 'מ-3 עד 5 יחידות: קריאה, כתיבה, דקדוק, הבנת הנשמע וניתוח ספרות. הכנה מלאה לכל מרכיבי הבגרות.',
    units: ['Module D', 'Module E', 'Module F'],
    unitVariants: ['unit3', 'unit4', 'unit5'] as const,
    color: 'from-emerald-500 to-teal-600',
    topics: ['Reading', 'Grammar', 'Writing', 'Listening', 'Literature', 'Vocabulary'],
  },
]

export default function SubjectCards() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-navy-600 mb-4">בחר מקצוע</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            תכנים מפורטים לכל יחידת לימוד, בהתאם לתכנית הלימודים הרשמית
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subjects.map((subj, i) => (
            <motion.div
              key={subj.href}
              initial={{ opacity: 0, x: i === 0 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link href={subj.href}>
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300
                                hover:-translate-y-2 overflow-hidden group cursor-pointer">
                  {/* Card header gradient */}
                  <div className={`bg-gradient-to-l ${subj.color} p-8 text-white`}>
                    <div className="text-5xl mb-3">{subj.emoji}</div>
                    <h3 className="text-3xl font-black">{subj.title}</h3>
                    <p className="text-white/75 text-sm mt-1">{subj.subtitle}</p>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {subj.units.map((u, j) => (
                        <span key={u} className="bg-white/20 border border-white/30 text-white text-xs px-3 py-1 rounded-full font-medium">
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <p className="text-slate-600 leading-relaxed mb-5">{subj.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {subj.topics.map((t) => (
                        <span key={t} className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-navy-600 font-bold group-hover:text-gold-500 transition-colors">
                        כניסה לחומר ←
                      </span>
                      <span className="text-xs text-slate-400">לפי תכנית משרד החינוך</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
