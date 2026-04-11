'use client'
import React, { useEffect, useState } from 'react'
import styles from '../../app/page.module.scss'

const words = [
  'Web Development',
  'Data Structures & Algorithms',
  'Personal Development',
]

const DISPLAY_DURATION = 2800
const TRANSITION_DURATION = 500

export default function HeroSection() {
  const [index, setIndex] = useState(0)
  const [animState, setAnimState] = useState<'in' | 'visible' | 'out'>('in')

  const { HeroSectionContainer, randomHeroDiv, first, second, third } = styles
  const colorClasses = [first, second, third]
  const animClasses = {
    in: styles.slideIn,
    visible: styles.slideVisible,
    out: styles.slideOut,
  }

  useEffect(() => {
    if (animState === 'in') {
      const t = setTimeout(() => setAnimState('visible'), TRANSITION_DURATION)
      return () => clearTimeout(t)
    }
    if (animState === 'visible') {
      const t = setTimeout(() => setAnimState('out'), DISPLAY_DURATION)
      return () => clearTimeout(t)
    }
    if (animState === 'out') {
      const t = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
        setAnimState('in')
      }, TRANSITION_DURATION)
      return () => clearTimeout(t)
    }
  }, [animState])

  return (
    <section id="hero" className={HeroSectionContainer}>
      <h1>
        Byte-sized Insights for
        <div className={styles.heroWordWrapper}>
          <div className={`${randomHeroDiv} ${colorClasses[index]} ${animClasses[animState]}`}>
            {words[index]}
          </div>
        </div>
      </h1>
    </section>
  )
}
