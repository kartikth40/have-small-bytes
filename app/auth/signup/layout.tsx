import styles from './page.module.scss'

export const metadata = {
  title: 'Signup',
  description: 'signup page.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { loginPageContainer } = styles
  return (
    <main>
      <div className={loginPageContainer}>{children}</div>
    </main>
  )
}
