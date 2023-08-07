'use client'
import React, { useEffect } from 'react'
import styles from '../../app/page.module.scss'

type Props = {}

export default function HeroSection({}: Props) {
  let index = 0
  const words = [
    'Web Development',
    'Data Structures and Algorithms',
    'Personal Development',
  ]
  const { HeroSectionContainer, randomHeroDiv, first, second, third } = styles

  function addClass(i: number, hero: HTMLElement) {
    const classes = [first, second, third]
    let prevIdx = i - 1
    let curIdx = i
    if (i === 0) {
      prevIdx = words.length - 1
    }
    hero.classList.remove(classes[prevIdx])
    hero.classList.add(classes[curIdx])
  }

  function randomEffect(i: number) {
    const letters = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ'
    const hero = document.getElementById('heroRandom')
    if (!hero) return
    addClass(i, hero)
    let iterations = 0
    const currentWord = words[i]

    const interval = setInterval(() => {
      hero.innerText = currentWord
        .split('')
        .map((letter, i) => {
          if (letter === ' ') return ' '
          if (i < iterations) {
            return currentWord[i]
          } else {
            return letters[Math.floor(Math.random() * letters.length)]
          }
        })
        .join('')

      if (iterations > currentWord.length) clearInterval(interval)
      iterations += 1 / 2
    }, 30)
  }

  function addRandomEffect(i: number = 0) {
    const interval = setInterval(() => {
      i++
      if (i >= words.length) i = 0
      randomEffect(i)
      index = i
    }, 5000)
    return interval
  }

  useEffect(() => {
    let interval = addRandomEffect()

    function onWindowBlur() {
      clearInterval(interval)
    }
    function onWindowFocus() {
      interval = addRandomEffect(index)
    }

    window.addEventListener('blur', onWindowBlur)
    window.addEventListener('focus', onWindowFocus)

    return () => {
      clearInterval(interval)
      window.removeEventListener('blur', onWindowBlur)
      window.removeEventListener('focus', onWindowFocus)
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
