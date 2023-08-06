'use client'
import React, { useEffect } from 'react'
import styles from '../../app/page.module.scss'

type Props = {}

export default function HeroSection({}: Props) {
  const { HeroSectionContainer, randomHeroDiv, first, second, third } = styles
  const words = [
    'Web Development',
    'Data Structures and Algorithms',
    'Personal Development',
  ]

  function addClass(index: number, hero: HTMLElement) {
    const classes = [first, second, third]
    let prevIdx = index - 1
    let curIdx = index
    if (index === 0) {
      prevIdx = words.length - 1
    }
    hero.classList.remove(classes[prevIdx])
    hero.classList.add(classes[curIdx])
  }

  function randomEffect(index: number) {
    const letters = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ'
    const hero = document.getElementById('heroRandom')
    if (!hero) return
    addClass(index, hero)
    let iterations = 0
    const currentWord = words[index]
    const interval = setInterval(() => {
      hero.innerText = currentWord
        .split('')
        .map((letter, index) => {
          if (letter === ' ') return ' '
          if (index < iterations) {
            return currentWord[index]
          } else {
            return letters[Math.floor(Math.random() * letters.length)]
          }
        })
        .join('')

      if (iterations > currentWord.length) clearInterval(interval)
      iterations += 1 / 2
    }, 30)
  }

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      index++
      if (index >= words.length) index = 0
      randomEffect(index)
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <section id="hero" className={HeroSectionContainer}>
      <h1>
        Byte-sized Insights for
        <div id="heroRandom" className={randomHeroDiv}>
          {words[0]}
        </div>
      </h1>
    </section>
  )
}
