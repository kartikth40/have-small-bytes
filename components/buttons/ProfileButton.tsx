'use client'
import { useSession } from 'next-auth/react'
import styles from '@/app/page.module.scss'
import Link from 'next/link'

type Props = {}

export default function ProfileButton({}: Props) {
  const { data: session } = useSession()
  const { profileBtn } = styles

  if (session && session.user) {
    return (
      <button className={profileBtn}>
        <Link href="/reader/profile">{session.user.username}</Link>
      </button>
    )
  }
  return null
}
