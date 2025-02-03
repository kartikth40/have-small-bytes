import styles from './page.module.scss'
export default function Layout({ children }: { children: React.ReactNode }) {
  const { pageLayout } = styles
  return (
    <main>
      <div className={pageLayout}>{children}</div>
    </main>
  )
}
