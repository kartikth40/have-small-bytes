'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getNotificationsCount } from '@/services'
type NotificationContext = {
  unread: boolean
  setUnread: React.Dispatch<React.SetStateAction<boolean>>
}

export const NotificationContext = React.createContext<NotificationContext>(
  {} as NotificationContext
)

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { data: session } = useSession()
  const [unread, setUnread] = useState<boolean>(false)

  useEffect(() => {
    if (session?.user) {
      async function getNotif() {
        const notif = await getNotificationsCount(session?.user.id!)
        if (notif > 0) setUnread(true)
        else setUnread(false)
      }
      getNotif()
    }
  }, [session])

  return (
    <NotificationContext.Provider value={{ unread, setUnread }}>
      {children}
    </NotificationContext.Provider>
  )
}
