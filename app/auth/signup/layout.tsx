import styles from './page.module.scss'

export const metadata = {
  title: 'Signup',
  description: 'signup page.',
  alternates: {
    canonical: '/auth/signup',
    languages: {
      en: '/en/auth/signup',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { loginPageContainer } = styles
  return (
    <main>
      <div className={loginPageContainer}>{children}</div>
    </main>
  )
}
