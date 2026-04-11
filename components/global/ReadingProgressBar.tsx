'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './readingProgressBar.module.scss'

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const isPostPage = pathname?.startsWith('/post/')

  useEffect(() => {
    if (!isPostPage) return

    const onScroll = () => {
      const target = document.getElementById('post-author')
      if (!target) return
      const targetTop = target.getBoundingClientRect().top + window.scrollY
      // 100% when viewport bottom reaches the author section top
      const scrollable = targetTop - window.innerHeight
      const progress = scrollable > 0 ? Math.min((window.scrollY / scrollable) * 100, 100) : 100
      setProgress(progress)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isPostPage])

  if (!isPostPage) return null

  return (
    <div className={styles.track}>
      <div className={styles.bar} style={{ width: `${progress}%` }} />
    </div>
  )
}
