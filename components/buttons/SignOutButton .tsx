'use client'
import { signOut, useSession } from 'next-auth/react'
import styles from '@/app/page.module.scss'
import { toast } from 'react-toastify'

type Props = {}

export default function SignOutButton({}: Props) {
  const { data: session } = useSession()
  const { signOutBtn } = styles
  if (session && session.user) {
    return (
      <button
        className={signOutBtn}
        onClick={() => {
          signOut({ callbackUrl: '/' })
          toast.success('logged out', { autoClose: 1000 })
        }}
      >
        Sign out
      </button>
    )
  }
  return null
}
