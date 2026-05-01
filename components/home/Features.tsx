'use client'
import { motion } from 'framer-motion'

const features = [
  {
    emoji: '🎬',
    title: 'סרטוני AI מרהיבים',
    description: 'לכל נושא סרטון הסבר המופק בטכנולוגיית Kling AI – אנימציות מקצועיות, הסברים שלב-אחר-שלב.',
  },
  {
    emoji: '📝',
    title: 'שאלונים אמיתיים',
    description: 'מאגר שאלות עדכני התואם בדיוק לשאלוני הבגרות – לפי רמה, מקצוע ויחידת לימוד.',
  },
  {
    emoji: '🏆',
    title: 'מערכת גמיפיקציה',
    description: 'צבור XP, עלה ברמות, קבל תגים והישגים. לימוד שמוטיבציה הוא מפתח ההצלחה.',
  },
  {
    emoji: '📊',
    title: 'לוח בקרה אישי',
    description: 'מעקב מלא אחר ההתקדמות שלך – נושאים שסיימת, ציונים, streak ימי לימוד, ועוד.',
  },
  {
    emoji: '🎯',
    title: 'מותאם אישית',
    description: 'האתר מזהה את רמתך ומציג תכנים רלוונטיים – מ-3 יחידות ועד הרמה הגבוהה ביותר.',
  },
  {
    emoji: '✅',
    title: 'מאושר אקדמית',
    description: 'כל התכנים מאושרים בהתאם לתכנית הלימודים של משרד החינוך והמועצה להשכלה גבוהה.',
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-black text-navy-600 mb-4">למה לבחור בנו?</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            פלטפורמת הלמידה המתקדמת ביותר להכנה לבגרות בישראל
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg
                         transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {f.emoji}
              </div>
              <h3 className="text-lg font-bold text-navy-600 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
