import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'מכינה לבגרות | מתמטיקה ואנגלית – 3 עד 5 יחידות',
  description: 'הכנה מקצועית לבגרות במתמטיקה ואנגלית. תכנים לפי משרד החינוך, שאלונים מותאמים, סרטוני הסבר ולוח התקדמות אישי.',
  keywords: 'בגרות, מתמטיקה, אנגלית, 5 יחידות, הכנה לבגרות, שאלון 035381, module F',
  openGraph: {
    title: 'מכינה לבגרות | מתמטיקה ואנגלית',
    description: 'הכנה מקצועית לבגרות – תכנים מאושרים, חידונים וסרטוני למידה.',
    locale: 'he_IL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
