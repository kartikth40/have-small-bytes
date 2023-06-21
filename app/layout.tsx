import './globals.scss'
import { Inter, Nabla } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const nabla = Nabla({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nabla',
})

export const metadata = {
  title: 'Have Small Byte',
  description: 'Byte size blogs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en" className={inter.className}>
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </Providers>
  )
}
