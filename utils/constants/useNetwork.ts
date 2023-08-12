'use client'
import { useEffect, useState } from 'react'

function useNetwork() {
  const [isOnline, setNetwork] = useState(window.navigator.onLine)
  function setStatus() {
    setNetwork(window.navigator.onLine)
  }
  useEffect(() => {
    window.addEventListener('offline', setStatus)
    window.addEventListener('online', setStatus)

    return () => {
      window.removeEventListener('online', setStatus)
      window.removeEventListener('offline', setStatus)
    }
  }, [])
  return isOnline
}

export default useNetwork
