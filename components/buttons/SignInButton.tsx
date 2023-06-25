'use client'
import { signIn, useSession } from 'next-auth/react'
import styles from '@/app/page.module.scss'
import ProfileButton from './ProfileButton'
import SignOutButton from './SignOutButton '
import { usePathname } from 'next/navigation'

type Props = {}

export default function SignInButton({}: Props) {
  const { data: session } = useSession()

  const path = usePathname()
  if (path === '/auth/signin' || path === '/auth/signup') return null

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
