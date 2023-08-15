'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from './ThemeContext'
import { NotificationProvider } from './NotificationContext'

type Props = { children: React.ReactNode }

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
