import styles from './page.module.scss'

export const metadata = {
  title: 'Login',
  description: 'login page.',
  alternates: {
    canonical: '/auth/signin',
    languages: {
      en: '/en/auth/signin',
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
