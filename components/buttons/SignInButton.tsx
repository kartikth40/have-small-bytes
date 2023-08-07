'use client'
import { useSession } from 'next-auth/react'
import styles from '@/app/page.module.scss'
import ProfileButton from './ProfileButton'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

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
    <Link
      href="/auth/signin"
      className={`${signInBtn} ${loading && loadingBtn}`}
    >
      Login
    </Link>
  )
}
