'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './feedbackBtn.module.scss'
import shareStyles from './shareButton.module.scss'

type Props = { slug: string; title: string }

export default function ShareButton({ slug, title }: Props) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  const [shareCount, setShareCount] = useState<number | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const url = typeof window !== 'undefined' ? window.location.href : `https://havesmallbytes.vercel.app/post/${slug}`

  useEffect(() => {
    fetch(`/api/shares?slug=${slug}`)
      .then((r) => r.json())
      .then((d) => setShareCount(d.shares))
      .catch(() => setShareCount(0))
  }, [slug])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const COOLDOWN_MS = 24 * 60 * 60 * 1000

  function canShare(type: 'copy' | 'twitter' | 'linkedin'): boolean {
    try {
      const raw = localStorage.getItem(`shared:${slug}`)
      const timestamps: Record<string, number> = raw ? JSON.parse(raw) : {}
      const last = timestamps[type]
      return !last || Date.now() - last > COOLDOWN_MS
    } catch { return true }
  }

  function markShared(type: 'copy' | 'twitter' | 'linkedin') {
    try {
      const raw = localStorage.getItem(`shared:${slug}`)
      const timestamps: Record<string, number> = raw ? JSON.parse(raw) : {}
      timestamps[type] = Date.now()
      localStorage.setItem(`shared:${slug}`, JSON.stringify(timestamps))
    } catch {}
  }

  function trackShare(type: 'copy' | 'twitter' | 'linkedin') {
    if (!canShare(type)) return
    fetch('/api/shares', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug }) })
      .then((r) => r.json())
      .then((d) => { setShareCount(d.shares); markShared(type) })
      .catch(() => {})
  }

  function copyLink() {
    navigator.clipboard.writeText(url)
    trackShare('copy')
    setCopied(true)
    setTimeout(() => { setCopied(false); setOpen(false) }, 1500)
  }

  function shareTwitter() {
    trackShare('twitter')
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
    setOpen(false)
  }

  function shareLinkedIn() {
    trackShare('linkedin')
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
    setOpen(false)
  }

  return (
    <div className={shareStyles.wrapper} ref={wrapperRef}>
      <button
        className={`${styles.Btn_container} ${shareStyles.shareBtn}`}
        onClick={() => setOpen((p) => !p)}
        title="Share"
      >
        <svg width="0.7em" height="0.7em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        <span className={`${styles.likeCountContainer} ${styles.showLikeCount}`}>
          {shareCount === null ? <span className={styles.loadingDot}>·</span> : shareCount}
        </span>
      </button>

      {open && (
        <div className={shareStyles.dropdown}>
          <button onClick={copyLink} className={shareStyles.option}>
            <span className={shareStyles.iconWrap}>
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </span>
            {copied ? 'Copied!' : 'Copy link'}
          </button>

          <button onClick={shareTwitter} className={shareStyles.option}>
            <span className={shareStyles.iconWrap}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </span>
            Twitter / X
          </button>

          <button onClick={shareLinkedIn} className={shareStyles.option}>
            <span className={shareStyles.iconWrap}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </span>
            LinkedIn
          </button>
        </div>
      )}
    </div>
  )
}
