import './global.css'
import './globals.scss'
import { Inter, Nabla, Source_Code_Pro } from 'next/font/google'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import Providers from '@/components/global/Providers'
import ClientToastContainer from '@/components/global/ClientToastContainer'
import { Analytics } from '@vercel/analytics/react'

export const metadata = {
  title: {
    default: 'Have Small Bytes',
    template: '%s | HSB',
  },
  description: 'Byte size blogs',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const source_code_pro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
})

export const nabla = Nabla({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nabla',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const setInitialTheme = `function run() {
    let theme = window.localStorage.getItem('theme')
    if (!theme) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        theme = ('system-dark')
      } else {
        theme = ('system-light')
      }
      window.localStorage.setItem('theme', theme)
    }
      if (theme === 'dark' || theme === 'system-dark') {
      document.body.classList.add('darkTheme')
    } else {
      document.body.classList.remove('darkTheme')
      }
  }
  run()`
  return (
    <Providers>
      <html lang="en" className={inter.className}>
        <body suppressHydrationWarning={true}>
          <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
          <Header />
          {children}
          <Analytics />
          <ClientToastContainer />
          <Footer />
        </body>
      </html>
    </Providers>
  )
}
