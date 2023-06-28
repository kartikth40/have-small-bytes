'use client'
import SignOutButton from '@/components/buttons/SignOutButton '
import { redirect } from 'next/navigation'
import styles from './page.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
type Props = {}

export default function ProfilePage({}: Props) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  if (!session && !loading) {
    redirect(`/api/auth/signin?callbackUrl=/reader/profile`)
  }

  const [selected, setSelected] = useState<string>('profile')

  const { profilePageContainer, mainContainer, sideMenu, content } = styles
  return (
    <div className={profilePageContainer}>
      <h2>Your Profile</h2>

      <div className={mainContainer}>
        <div className={sideMenu}>
          <div
            onClick={() => {
              setSelected('profile')
            }}
          >
            Profile
          </div>
          <div>
            <SignOutButton />
          </div>
        </div>
        <div className={content}>{selected === 'profile' && 'Profile Pic'}</div>
      </div>
    </div>
  )
}
