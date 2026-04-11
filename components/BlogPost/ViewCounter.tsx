'use client'

import { useEffect, useState } from 'react'
import styles from './viewCounter.module.scss'

const COOLDOWN_MS = 24 * 60 * 60 * 1000 // 24 hours

function hasViewedRecently(slug: string): boolean {
  try {
    const raw = localStorage.getItem(`viewed:${slug}`)
    if (!raw) return false
    return Date.now() - Number(raw) < COOLDOWN_MS
  } catch {
    return false
  }
}

function markViewed(slug: string) {
  try {
    localStorage.setItem(`viewed:${slug}`, String(Date.now()))
  } catch {}
}

export default function ViewCounter({ slug, readOnly = false }: { slug: string; readOnly?: boolean }) {
  const [views, setViews] = useState<number | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (readOnly) {
      fetch(`/api/views?slug=${slug}`)
        .then((res) => res.json())
        .then((data) => setViews(data.views))
        .catch(() => setError(true))
      return
    }

    const alreadyViewed = hasViewedRecently(slug)

    if (alreadyViewed) {
      // just fetch current count, don't increment
      fetch(`/api/views?slug=${slug}`)
        .then((res) => res.json())
        .then((data) => setViews(data.views))
        .catch(() => setError(true))
    } else {
      // increment and record timestamp
      fetch('/api/views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
        .then((res) => res.json())
        .then((data) => {
          setViews(data.views)
          markViewed(slug)
        })
        .catch(() => setError(true))
    }
  }, [slug])

  return (
    <div className={styles.viewCounter}>
      <div className={styles.icon}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
      <div className={styles.text}>
        <span className={styles.label}>views</span>
        <span className={styles.count}>
          {error ? '✕' : views === null ? '...' : views.toLocaleString()}
        </span>
      </div>
    </div>
  )
}
