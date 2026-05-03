import Link from 'next/link'
import { BookOpen, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-navy-900" />
              </div>
              <span className="text-white font-black text-lg">מכינה<span className="text-gold-400">לבגרות</span></span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              הכנה מקצועית לבגרות במתמטיקה ואנגלית.<br />
              תכנים מאושרים לפי תכנית משרד החינוך והמועצה להשכלה גבוהה.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4">מקצועות</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/math', label: 'מתמטיקה 3 יחידות' },
                { href: '/math', label: 'מתמטיקה 4 יחידות' },
                { href: '/math', label: 'מתמטיקה 5 יחידות' },
                { href: '/english', label: 'אנגלית (Module D–F)' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">צור קשר</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>info@bagrut-prep.co.il</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span dir="ltr">050-000-0000</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-slate-500">
                © 2025 מכינה לבגרות. כל הזכויות שמורות.<br />
                התכנים מאושרים בהתאם לתכנית הלימודים של משרד החינוך.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
