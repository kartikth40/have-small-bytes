'use client'
import { useState, useEffect } from 'react'

function useWindowSize() {
  const isWindowClient = typeof window === 'object'

  const [windowSize, setWindowSize] = useState(
    isWindowClient ? window.innerWidth : undefined
  )

  useEffect(() => {
    function setSize() {
      setWindowSize(window.innerWidth)
    }
    setSize()
    if (isWindowClient) {
      window.addEventListener('resize', setSize)

      return () => window.removeEventListener('resize', setSize)
    }
  }, [isWindowClient, setWindowSize])

  return windowSize
}

export default useWindowSize
