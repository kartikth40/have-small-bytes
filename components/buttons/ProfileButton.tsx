'use client'
import { useSession } from 'next-auth/react'
import styles from '@/app/page.module.scss'

type Props = {}

export default function ProfileButton({}: Props) {
  const { data: session } = useSession()
  const { profileBtn } = styles
  if (session && session.user) {
    return <button className={profileBtn}>{session.user.username}</button>
  }
  return null
}
