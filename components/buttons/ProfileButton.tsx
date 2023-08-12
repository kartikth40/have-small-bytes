'use client'
import { useSession } from 'next-auth/react'
import styles from '@/app/page.module.scss'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'

type Props = {}

export default function ProfileButton({}: Props) {
  const [isAuthor, setIsAuthor] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user) {
      setIsAuthor(session.user.isAuthor)
    }
  }, [session])

  const { profileBtn } = styles
  if (session && session.user) {
    return (
      <button className={profileBtn}>
        <Link href="/reader/profile">
          {isAuthor ? (
            <Image
              src={'/icons/crown.png'}
              style={{
                objectFit: 'cover',
              }}
              // sizes="(max-width: 768px) 40px, (max-width: 1200px) 50px, 40px"
              width={20}
              height={20}
              sizes="20px"
              alt={'crown icon'}
            />
          ) : (
            ''
          )}
          {session.user.name}
        </Link>
      </button>
    )
  }
  return null
}
