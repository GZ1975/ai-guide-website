'use client'
import { motion } from 'framer-motion'

const steps = [
  { step: '01', emoji: '🎯', title: 'בחר מקצוע ורמה', desc: 'בחר מתמטיקה או אנגלית ואת מספר יחידות הלימוד המתאים לך (3, 4 או 5).' },
  { step: '02', emoji: '🎬', title: 'צפה בסרטון', desc: 'צפה בסרטון ההסבר המופק ב-AI – הסבר ויזואלי ברור עם אנימציות מקצועיות.' },
  { step: '03', emoji: '✏️', title: 'תרגל עם שאלות', desc: 'ענה על שאלות מותאמות לרמת הבגרות. קבל הסברים מיידיים לכל שאלה.' },
  { step: '04', emoji: '📊', title: 'עקוב אחר ההתקדמות', desc: 'צבור XP, קבל הישגים ועקוב אחר ההתקדמות שלך בלוח הבקרה האישי.' },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-black text-navy-600 mb-4">איך זה עובד?</h2>
          <p className="text-slate-500 text-lg">4 צעדים פשוטים לבגרות מוצלחת</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gold-300/50 z-0" style={{ left: '50%' }} />
              )}

              <div className="relative z-10 bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-navy-600 text-white rounded-xl flex items-center justify-center
                                font-black text-sm mx-auto mb-4">
                  {s.step}
                </div>
                <div className="text-3xl mb-3">{s.emoji}</div>
                <h3 className="font-bold text-navy-600 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
