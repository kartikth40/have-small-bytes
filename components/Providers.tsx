import React from 'react'
import { SessionProvider } from 'next-auth/react'

type Props = { children: React.ReactNode }

export default function Providers({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>
}
