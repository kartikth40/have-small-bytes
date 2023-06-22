'use client'
import { signIn, useSession } from 'next-auth/react'
import styles from '@/app/page.module.scss'
import ProfileButton from './ProfileButton'
import SignOutButton from './SignOutButton '

type Props = {}

export default function SignInButton({}: Props) {
  const { data: session } = useSession()
  console.log(session)
  const { signInBtn } = styles
  if (session && session.user) {
    return (
      <>
        <ProfileButton />
        <SignOutButton />
      </>
    )
  }
  return (
    <>
      <button className={signInBtn} onClick={() => signIn()}>
        Sign in
      </button>
      <SignOutButton />
    </>
  )
}
