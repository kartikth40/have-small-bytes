import './global.css'
import './globals.scss'
import { Inter, Nabla, Source_Code_Pro } from 'next/font/google'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import Providers from '@/components/global/Providers'
import ClientToastContainer from '@/components/global/ClientToastContainer'
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  metadataBase: new URL('https://havesmallbytes.vercel.app'),
  title: {
    default: 'Have Small Bytes',
    template: '%s | HSB',
  },
  description:
    'Have Small Bytes: A Next.js based Blog site providing byte size blogs all about Web Development, DSA and Personal Development throughout my journey.',
  generator: 'Next.js',
  applicationName: 'Have Small Bytes',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'Personal Development',
    'Web Development',
    'Data Structures and Algorithms',
    'DSA',
    'Graphql',
    'cms',
    'blogs',
    'blogging',
    'problem solving',
  ],
  authors: [{ name: 'Kartik Thakur', url: 'https://kartikthakur-me.web.app' }],
  colorScheme: 'dark',
  creator: 'Kartik Thakur',
  publisher: 'Kartik Thakur',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
    },
  },
  openGraph: {
    title: 'Have Small Bytes',
    description:
      'Have Small Bytes: A Next.js based Blog site providing byte size blogs all about Web Development, DSA and Personal Development throughout my journey.',
    images: [
      {
        url: '/icons/hsb-icon.png',
        width: 400,
        height: 400,
      },
    ],
  },
  verification: {
    google: 'c9uJ-D82Cxn_WbzqjgqwCLcI6Rom_xHZTkjfqC4hJ3g',
  },
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
        <GoogleAnalytics gaId="G-NYXC0PTZ06" />
      </html>
    </Providers>
  )
}
