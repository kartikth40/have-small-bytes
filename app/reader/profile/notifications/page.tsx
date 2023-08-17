'use client'

import React, { useContext, useEffect, useState } from 'react'
import styles from '@/app/reader/profile/page.module.scss'
import { redirect, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  deleteAllNotifications,
  deleteAllOlderNotifications,
  getNotifications,
  readAllNotifications,
  readNotification,
} from '@/services'
import { notificationType } from '@/utils/types/types'
import { NotificationContext } from '@/components/global/NotificationContext'
import { timeAgo } from '@/utils/functions'

type Props = {}

export default function ResetPassword({}: Props) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const [loadingNotifications, setLoadingNotifications] = useState(true)
  const [notifications, setNotifications] = useState<notificationType[] | []>(
    []
  )
  const { unread, setUnread, refetchUnread } = useContext(NotificationContext)
  const router = useRouter()

  useEffect(() => {
    async function deleteOldNotif() {
      const olderDate = new Date()
      olderDate.setDate(olderDate.getDate() - 30)
      const olderDateString = olderDate.toISOString()
      await deleteAllOlderNotifications(session?.user.id!, olderDateString)
    }
    async function getAllNotif() {
      setNotifications(await getNotifications(session?.user.id!))

      console.log(await getNotifications(session?.user.id!))

      setLoadingNotifications(false)
    }
    async function refetch() {
      await refetchUnread()
    }
    if (session?.user?.id) {
      deleteOldNotif()
      getAllNotif()
      refetch()
    }
  }, [session])

  const {
    loadingState,
    headingsContainer,
    notificationContainer,
    container,
    notification,
    actionsContainer,
    readAllBtn,
    deleteAllBtn,
    infoContainer,
    unRead,
    unReadIndicator,
    arrow,
    time,
  } = styles

  if (loading) {
    return <div className={loadingState}>Loading ...</div>
  }
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/reader/profile`)
  }

  async function handleReadAll(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const readAll = await readAllNotifications(session?.user.id!)
    if (readAll) {
      setNotifications(await getNotifications(session?.user.id!))
      setUnread(false)
    }
    const button = e.target as HTMLElement
    button.blur()
  }

  async function handleDeleteAll(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const deleteAll = await deleteAllNotifications(session?.user.id!)
    if (deleteAll) {
      setNotifications([])
      setUnread(false)
    }
    const button = e.target as HTMLElement
    button.blur()
  }

  async function handleNotificationClick(
    notificationId: string,
    postSlug: string,
    postId: string,
    isRead: boolean
  ) {
    if (!isRead) {
      await readNotification(notificationId)
    }

    if (postId) {
      router.push(`/post/${postSlug}/#comment-section-${postId}`)
    } else {
      router.push(`/post/${postSlug}`)
    }
  }

  function printNotification(
    actor: string,
    post: string,
    notificationType: string
  ) {
    if (notificationType === 'liked') {
      return `${actor} liked your post "${post}"`
    } else if (notificationType === 'commented') {
      return `${actor} commented on your post "${post}"`
    } else if (notificationType === 'replied') {
      return `${actor} replied on your comment on "${post}"`
    } else return 'Ooops! Something went wrong.'
  }

  return (
    <div className={notificationContainer}>
      <div className={headingsContainer}>
        <h3>Notifications</h3>
      </div>
      <div className={container}>
        <div className={actionsContainer}>
          <button
            className={readAllBtn}
            onClick={async (e) => await handleReadAll(e)}
          >
            Read All
          </button>
          <button
            className={deleteAllBtn}
            onClick={async (e) => await handleDeleteAll(e)}
          >
            Delete All
          </button>
        </div>
        {notifications.length > 0 && !loadingNotifications ? (
          notifications.map((not) => (
            <div
              key={not.id}
              className={`${notification} ${!not.isRead ? unRead : ''}`}
              onClick={async () =>
                await handleNotificationClick(
                  not.id,
                  not.post.slug,
                  not.post.id,
                  not.isRead
                )
              }
            >
              {printNotification(
                not.actor.name,
                not.post.title,
                not.notifyType
              )}
              <span className={arrow}></span>
              <div className={infoContainer}>
                <div
                  className={`${time} ${!not.isRead ? unReadIndicator : ''}`}
                >
                  {timeAgo(not.createdAt)} ago
                </div>
              </div>
            </div>
          ))
        ) : loadingNotifications ? (
          <div className={notification}>Loading Notifications...</div>
        ) : (
          <div className={notification}>No Notifications.</div>
        )}
      </div>
      {notifications.length > 0 ? (
        <p>*Notifications will be deleted automatically after 30 days.</p>
      ) : (
        ''
      )}
    </div>
  )
}
