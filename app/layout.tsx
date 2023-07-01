import './globals.scss'
import { Inter, Nabla } from 'next/font/google'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import Providers from '@/components/global/Providers'
import ClientToastContainer from '@/components/global/ClientToastContainer'

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
  title: 'Have Small Bytes',
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
          <ClientToastContainer />
          <Footer />
        </body>
      </html>
    </Providers>
  )
}
