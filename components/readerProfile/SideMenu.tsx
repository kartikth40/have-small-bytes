'use client'

import React from 'react'
import styles from '@/app/reader/profile/page.module.scss'
import SignOutButton from '@/components/buttons/SignOutButton '
import Link from 'next/link'

type Props = {
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

export default function SideMenu({ selected, setSelected }: Props) {
  const { sideMenu, dangerZone, deleteBtn, selectedBtn } = styles

  return (
    <div className={sideMenu}>
      <div
        className={`${selected === 'profile' && selectedBtn}`}
        onClick={() => {
          setSelected('profile')
        }}
      >
        <Link href="/reader/profile">Update Profile</Link>
      </div>
      <div
        className={`${selected === 'reset' && selectedBtn}`}
        onClick={() => {
          setSelected('reset')
        }}
      >
        <Link href="/reader/profile/reset-password">Reset Password</Link>
      </div>

      <br />
      <div className={dangerZone}>
        <div
          className={`${selected === 'delete' && selectedBtn} ${deleteBtn}`}
          onClick={() => {
            setSelected('delete')
          }}
        >
          <Link href="/reader/profile/delete-account">Delete Account</Link>
        </div>

        <div>
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}
