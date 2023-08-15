'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/app/reader/profile/page.module.scss'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { getNotifications } from '@/services'
import { notificationType } from '@/utils/types/types'

type Props = {}

export default function ResetPassword({}: Props) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const [loadingNotifications, setLoadingNotifications] = useState(true)
  const [notifications, setNotifications] = useState<notificationType[] | []>(
    []
  )

  useEffect(() => {
    async function getAllNotif() {
      if (session?.user?.id) {
        setNotifications(await getNotifications(session?.user.id))
        setLoadingNotifications(false)
        console.log(await getNotifications(session?.user.id))
      }
    }
    getAllNotif()
  }, [session])

  const {
    loadingState,
    headingsContainer,
    notificationContainer,
    container,
    notification,
  } = styles

  if (loading) {
    return <div className={loadingState}>Loading ...</div>
  }
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/reader/profile`)
  }

  return (
    <div className={notificationContainer}>
      <div className={headingsContainer}>
        <h3>Notifications</h3>
      </div>
      <div className={container}>
        {notifications.length > 0 && !loadingNotifications ? (
          notifications.map((not) => (
            <div key={not.id} className={notification}>
              {not.entity.entity}
            </div>
          ))
        ) : loadingNotifications ? (
          <div className={notification}>Loading Notifications...</div>
        ) : (
          <div className={notification}>No Notifications.</div>
        )}
      </div>
    </div>
  )
}
