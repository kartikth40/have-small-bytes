'use client'

import React, { useContext, useEffect, useState } from 'react'
import styles from './page.module.scss'
import SideMenu from '@/components/readerProfile/SideMenu'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { NotificationContext } from '@/components/global/NotificationContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<string>('profile')
  const params = usePathname()
  const { unread } = useContext(NotificationContext)

  useEffect(() => {
    if (params === '/reader/profile') {
      setSelected('profile')
    } else if (params === '/reader/profile/notifications') {
      setSelected('notifications')
    } else if (params === '/reader/profile/reset-password') {
      setSelected('reset')
    } else if (params === '/reader/profile/delete-account') {
      setSelected('delete')
    }
  }, [params])

  function addClass() {
    window.addEventListener('click', handleHide)
    document.getElementById('menu-opener')?.classList.add(open)
  }
  function removeClass() {
    window.removeEventListener('click', handleHide)
    document.getElementById('menu-opener')?.classList.remove(open)
  }

  function handleHide(e: Event) {
    const buttonItself = document.getElementById('menu-opener')
    if (e.target !== buttonItself) {
      setTimeout(() => {
        removeClass()
      }, 300)
    }
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const hasClass = document
      .getElementById('menu-opener')
      ?.classList.contains(open)

    if (hasClass) {
      removeClass()
    } else {
      addClass()
    }
  }

  const {
    profilePageContainer,
    mainContainer,
    contentContainer,
    menuOpener,
    open,
    notifyOnMenu,
  } = styles

  return (
    <main style={{ height: '100vh' }}>
      <div className={profilePageContainer}>
        <h2>Profile</h2>

        <div className={mainContainer}>
          <button
            id="menu-opener"
            onClick={(e) => handleClick(e)}
            className={menuOpener}
          >
            <span className={`${unread ? notifyOnMenu : ''}`}></span>
          </button>
          <SideMenu
            selected={selected}
            setSelected={setSelected}
            unReadNotifications={unread}
          />
          <div className={contentContainer}>{children}</div>
        </div>
      </div>
    </main>
  )
}
