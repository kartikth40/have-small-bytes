import styles from './page.module.scss'

export const metadata = {
  title: 'Forgot Password',
  description: 'forgot password page.',
  alternates: {
    canonical: '/auth/forgot',
    languages: {
      en: '/en/auth/forgot',
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
