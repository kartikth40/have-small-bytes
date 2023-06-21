'use client'
import { signIn, useSession } from 'next-auth/react'
import styles from '@/app/page.module.scss'
import ProfileButton from './ProfileButton'

type Props = {}

export default function SignInButton({}: Props) {
  const { data: session } = useSession()
  const { signInBtn } = styles
  if (session && session.user) {
    return <ProfileButton />
  }
  return (
    <button className={signInBtn} onClick={() => signIn()}>
      Sign in
    </button>
  )
}
