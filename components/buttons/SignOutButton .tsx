'use client'
import { signOut, useSession } from 'next-auth/react'
import styles from '@/app/page.module.scss'

type Props = {}

export default function SignOutButton({}: Props) {
  const { data: session } = useSession()
  const { signOutBtn } = styles
  if (session && session.user) {
    return (
      <button
        className={signOutBtn}
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Sign out
      </button>
    )
  }
  return null
}
