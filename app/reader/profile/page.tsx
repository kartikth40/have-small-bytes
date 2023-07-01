'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'
import SideMenu from './SideMenu'
import ProfileUpdate from './ProfileUpdate'

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const loading = status === 'loading'

  const [selected, setSelected] = useState<string>('profile')

  const {
    profilePageContainer,
    mainContainer,
    contentContainer,
    loadingState,
  } = styles

  if (loading) {
    return <div className={loadingState}>Loading ...</div>
  }
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/reader/profile`)
  }

  return (
    <div className={profilePageContainer}>
      <h2>Profile</h2>

      <div className={mainContainer}>
        <SideMenu selected={selected} setSelected={setSelected} />
        <div className={contentContainer}>
          {selected === 'profile' && (
            <ProfileUpdate
              session={session}
              loading={loading}
              update={update}
            />
          )}
        </div>
      </div>
    </div>
  )
}
