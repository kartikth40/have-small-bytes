'use client'
import { signIn, useSession } from 'next-auth/react'
import styles from '@/app/page.module.scss'
import ProfileButton from './ProfileButton'
import { usePathname } from 'next/navigation'

type Props = {}

export default function SignInButton({}: Props) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const path = usePathname()
  if (path === '/auth/signin' || path === '/auth/signup') return null
  const { signInBtn, loadingBtn } = styles

  return !loading && session ? (
    <ProfileButton />
  ) : (
    <button
      className={`${signInBtn} ${loading && loadingBtn}`}
      onClick={() => signIn()}
    >
      Login
    </button>
  )
}
