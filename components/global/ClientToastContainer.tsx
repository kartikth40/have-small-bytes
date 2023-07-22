'use client'
import { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import { ThemeContext } from './ThemeContext'

type Props = {}

export default function ClientToastContainer({}: Props) {
  const { theme } = useContext(ThemeContext)
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeButton={true}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme={theme === 'system-dark' || theme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  )
}
