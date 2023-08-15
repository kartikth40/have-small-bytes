'use client'

import React from 'react'
import styles from '@/app/reader/profile/page.module.scss'
import SignOutButton from '@/components/buttons/SignOutButton '
import Link from 'next/link'

type Props = {
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
  unReadNotifications: boolean
}

export default function SideMenu({
  selected,
  setSelected,
  unReadNotifications,
}: Props) {
  const { sideMenu, deleteBtn, selectedBtn, notify } = styles

  return (
    <div className={sideMenu}>
      <Link
        className={`${selected === 'profile' && selectedBtn}`}
        onClick={() => {
          setSelected('profile')
        }}
        href="/reader/profile"
      >
        Update Profile
      </Link>
      <Link
        className={`${selected === 'notifications' && selectedBtn} ${
          unReadNotifications ? notify : ''
        }`}
        onClick={() => {
          setSelected('notifications')
        }}
        href="/reader/profile/notifications"
      >
        Notifications
      </Link>
      <Link
        className={`${selected === 'reset' && selectedBtn}`}
        onClick={() => {
          setSelected('reset')
        }}
        href="/reader/profile/reset-password"
      >
        Reset Password
      </Link>

      <Link
        className={`${selected === 'delete' && selectedBtn} ${deleteBtn}`}
        onClick={() => {
          setSelected('delete')
        }}
        href="/reader/profile/delete-account"
      >
        Delete Account
      </Link>

      <div>
        <SignOutButton />
      </div>
    </div>
  )
}
