import styles from './page.module.scss'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { profilePageContainer } = styles
  return (
    <main>
      <div className={profilePageContainer}>{children}</div>
    </main>
  )
}
