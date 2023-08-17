'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getNotificationsCount } from '@/services'
type NotificationContext = {
  unread: boolean
  setUnread: React.Dispatch<React.SetStateAction<boolean>>
  refetchUnread: () => Promise<void>
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

  const refetchUnread = async () => {
    await getNotif()
  }
  async function getNotif() {
    const notif = await getNotificationsCount(session?.user.id!)
    if (notif > 0) setUnread(true)
    else setUnread(false)
  }
  useEffect(() => {
    if (session?.user) {
      getNotif()
    }
  }, [session])

  return (
    <NotificationContext.Provider value={{ unread, setUnread, refetchUnread }}>
      {children}
    </NotificationContext.Provider>
  )
}
