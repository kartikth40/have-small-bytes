'use client'

import React, { useState } from 'react'
import styles from './page.module.scss'
import SideMenu from '@/components/readerProfile/SideMenu'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<string>('profile')

  const { profilePageContainer, mainContainer, contentContainer } = styles

  return (
    <main>
      <div className={profilePageContainer}>
        <h2>Profile</h2>

        <div className={mainContainer}>
          <SideMenu selected={selected} setSelected={setSelected} />
          <div className={contentContainer}>{children}</div>
        </div>
      </div>
    </main>
  )
}
