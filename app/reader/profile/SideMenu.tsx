'use client'

import React from 'react'
import styles from './page.module.scss'
import SignOutButton from '@/components/buttons/SignOutButton '

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
        Update Profile
      </div>
      <div
        className={`${selected === 'reset' && selectedBtn}`}
        onClick={() => {
          setSelected('reset')
        }}
      >
        Reset Password
      </div>
      <br />
      <div className={dangerZone}>
        <div
          className={`${selected === 'delete' && selectedBtn} ${deleteBtn}`}
          onClick={() => {
            setSelected('delete')
          }}
        >
          Delete Account
        </div>
        <div>
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}
