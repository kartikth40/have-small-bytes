'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './not-found.module.scss'
import { useEffect, useState } from 'react'
import Pixel404 from '@/components/Pixel404'

const CMD = 'cd ~/home'

const lines: { text: string; type: string; delay: number }[] = [
  { text: 'HAVE SMALL BYTES OS — kernel panic: page not found', type: 'bios', delay: 0 },
  { text: '', type: 'blank', delay: 400 },
  { text: '> looking for the page you wanted...', type: 'normal', delay: 600 },
  { text: '> searching every corner of the internet...', type: 'normal', delay: 1100 },
  { text: '> checking under the couch cushions...', type: 'normal', delay: 1600 },
  { text: "> nope. nothing. it's gone. 💀", type: 'error glitch', delay: 2100 },
  { text: '', type: 'blank', delay: 2500 },
  { text: '# this page either never existed,', type: 'comment', delay: 2700 },
  { text: '# moved somewhere else, or rage-quit the internet.', type: 'comment', delay: 3100 },
  { text: '', type: 'blank', delay: 3500 },
  { text: '__PIXEL__', type: 'pixel', delay: 3700 },
  { text: '', type: 'blank', delay: 4400 },
  { text: '> the homepage still exists though. probably.', type: 'suggest', delay: 4600 },
  { text: '> press Enter or Esc to go back home', type: 'comment', delay: 5000 },
]

// precompute at module level — avoids string ops on every render
const lineStyleClasses = lines.map(line =>
  line.type.split(' ').filter(Boolean).map(t => styles[t] || '').join(' ')
)
const isErrorLine = lines.map(line => line.type.includes('error'))

export default function NotFound() {
  const [visible, setVisible] = useState(0)
  const [showCmd, setShowCmd] = useState(false)
  const [cmdText, setCmdText] = useState('')
  const [glitchError, setGlitchError] = useState<string | false>(false)
  const [booting, setBooting] = useState(true)
  const router = useRouter()

  // keyboard shortcut
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Enter' || e.key === 'Escape') router.push('/')
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [router])

  // line reveal + boot timers — all cleaned up on unmount
  useEffect(() => {
    const ts: ReturnType<typeof setTimeout>[] = []
    ts.push(setTimeout(() => setBooting(false), 1000))
    lines.forEach((line, i) => {
      ts.push(setTimeout(() => setVisible(i + 1), line.delay))
    })
    ts.push(setTimeout(() => setShowCmd(true), 6000))
    return () => ts.forEach(clearTimeout)
  }, [])

  // typewriter for cmd — only runs once when showCmd flips
  useEffect(() => {
    if (!showCmd) return
    let i = 0
    const t = setInterval(() => {
      i++
      setCmdText(CMD.slice(0, i))
      if (i >= CMD.length) clearInterval(t)
    }, 80)
    return () => clearInterval(t)
  }, [showCmd])

  // random glitch 10-20s interval — both timers cleaned up
  useEffect(() => {
    let outerT: ReturnType<typeof setTimeout>
    let innerT: ReturnType<typeof setTimeout>
    let toggle = false
    function scheduleGlitch() {
      outerT = setTimeout(() => {
        toggle = !toggle
        setGlitchError(toggle ? 'a' : 'b')
        innerT = setTimeout(() => {
          setGlitchError(false)
          scheduleGlitch()
        }, 400)
      }, 10000 + Math.random() * 10000)
    }
    scheduleGlitch()
    return () => { clearTimeout(outerT); clearTimeout(innerT) }
  }, [])

  return (
    <main className={styles.container}>
      <div className={styles.terminal}>
        <div className={styles.terminalBar}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
          <span className={styles.terminalTitle}>bash — not-found — 80×24</span>
        </div>

        <div className={styles.terminalBody}>
          {booting ? (
            <div className={styles.booting}>
              <span className={styles.bootText}>initializing...</span>
              <span className={styles.cursor}>▋</span>
            </div>
          ) : (
            <>
              {lines.slice(0, visible).map((line, i) =>
                line.type === 'pixel' ? (
                  <div key={i} className={styles.pixelBlock}>
                    <Pixel404 />
                  </div>
                ) : (
                  <div
                    key={isErrorLine[i] ? `error-${glitchError}` : i}
                    className={`${styles.line} ${lineStyleClasses[i]} ${isErrorLine[i] && glitchError ? styles.glitching : ''}`}
                  >
                    {line.text}
                  </div>
                )
              )}

              {showCmd ? (
                <div className={styles.cmdLine}>
                  <span className={styles.prompt}>$</span>
                  {cmdText.length < CMD.length ? (
                    <span className={styles.cmdLink}>{cmdText}</span>
                  ) : (
                    <Link href="/" className={styles.cmdLink}>{cmdText}</Link>
                  )}
                  <span className={styles.cursor}>▋</span>
                </div>
              ) : visible < lines.length ? (
                <span className={styles.cursor}>▋</span>
              ) : null}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
