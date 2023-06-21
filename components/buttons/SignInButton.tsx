'use client'
import { useSession } from 'next-auth/react'
import styles from '@/app/page.module.scss'

type Props = {}

export default function SignInButton({}: Props) {
  const { data: session } = useSession()
  const { signInBtn, signOutBtn } = styles
  if (session && session.user) {
    return <button className={signInBtn}>Sign In</button>
  }
  return <button className={signOutBtn}>Sign Out</button>
}
