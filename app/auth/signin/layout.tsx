import styles from './page.module.scss'

export const metadata = {
  title: 'HSB | Login',
  description: 'login page.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { loginPageContainer } = styles
  return (
    <main>
      <div className={loginPageContainer}>{children}</div>
    </main>
  )
}
