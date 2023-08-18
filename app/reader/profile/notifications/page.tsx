'use client'

import React, { useContext, useEffect, useState } from 'react'
import styles from '@/app/reader/profile/page.module.scss'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  deleteAllNotifications,
  deleteAllOlderNotifications,
  getNotifications,
  getNotificationsCount,
  readAllNotifications,
  readNotification,
} from '@/services'
import { notificationType } from '@/utils/types/types'
import { NotificationContext } from '@/components/global/NotificationContext'
import { timeAgo } from '@/utils/functions'

type Props = {}

export default function ResetPassword({}: Props) {
  const NOTIFICATIONS_PER_PAGE = 10
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const [loadingNotifications, setLoadingNotifications] = useState(true)
  const [disablePrev, setDisablePrev] = useState(false)
  const [disableNext, setDisableNext] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const [count, setCount] = useState(0)
  const [notifications, setNotifications] = useState<notificationType[] | []>(
    []
  )
  const { unread, setUnread, refetchUnread } = useContext(NotificationContext)
  const router = useRouter()
  const search = useSearchParams()
  const page = parseInt(search.get('page')!)

  function getSkip(pageno: number) {
    return NOTIFICATIONS_PER_PAGE * (pageno - 1)
  }

  function isNext(pageno: number, ncount: number) {
    return NOTIFICATIONS_PER_PAGE * pageno < ncount
  }

  useEffect(() => {
    if (page) setPageNo(page)
  }, [])

  function handleButtonDisableStates() {
    const disabled = { next: false, prev: false }
    if (pageNo === 1) {
      disabled.prev = true
      setDisablePrev(true)
    } else {
      setDisablePrev(false)
    }
    if (isNext(pageNo, count)) {
      setDisableNext(false)
    } else {
      disabled.next = true
      setDisableNext(true)
    }
    return disabled
  }

  useEffect(() => {
    async function getAllNotif() {
      setNotifications(
        await getNotifications(session?.user.id!, getSkip(pageNo))
      )
      setCount(await getNotificationsCount(session?.user.id!))
      handleButtonDisableStates()
      setLoadingNotifications(false)
    }
    async function refetch() {
      await refetchUnread()
    }
    if (session?.user?.id) {
      getAllNotif()
      refetch()
    }
  }, [session, pageNo, count])

  useEffect(() => {
    async function deleteOldNotif() {
      const olderDate = new Date()
      olderDate.setDate(olderDate.getDate() - 30)
      const olderDateString = olderDate.toISOString()
      await deleteAllOlderNotifications(session?.user.id!, olderDateString)
    }
    if (session?.user) {
      deleteOldNotif()
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
    navigationButtons,
    prev,
    next,
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
      setNotifications(
        await getNotifications(session?.user.id!, getSkip(pageNo))
      )
      setUnread(false)
    }
    const button = e.target as HTMLElement
    button.blur()
  }

  async function handleDeleteAll(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const button = e.target as HTMLElement
    const sure = confirm(
      'Are you sure you want to delete all the notifications ?'
    )
    if (!sure) {
      button.blur()
      return
    }
    const deleteAll = await deleteAllNotifications(session?.user.id!)
    if (deleteAll) {
      setNotifications([])
      setUnread(false)
    }
    button.blur()
  }

  async function handleNotificationClick(notification: notificationType) {
    if (notification.notifyType === 'commented') {
      window.localStorage.setItem('commentId', notification.comment.id)
    } else if (notification.notifyType === 'replied') {
      window.localStorage.setItem(
        'commentId',
        notification.comment.replyToCommentId.id
      )
      window.localStorage.setItem('replyId', notification.comment.id)
    }

    if (notification.notifyType === 'liked') {
      router.push(`/post/${notification.post.slug}`)
    } else {
      router.push(
        `/post/${notification.post.slug}#comment-section-${notification.post.id}`
      )
    }

    if (!notification.isRead) {
      await readNotification(notification.id)
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

  async function handlePrev() {
    const disabled = handleButtonDisableStates()
    if (disabled.prev) return
    router.push(`/reader/profile/notifications?page=${pageNo - 1}`)
    setPageNo((prev) => prev - 1)
  }

  async function handleNext() {
    const disabled = handleButtonDisableStates()
    if (disabled.next) return
    router.push(`/reader/profile/notifications?page=${pageNo + 1}`)
    setPageNo((prev) => prev + 1)
  }

  return (
    <div className={notificationContainer}>
      <div className={headingsContainer}>
        <h3>Notifications</h3>
        <div className={navigationButtons}>
          <button
            disabled={disablePrev || loadingNotifications}
            onClick={async () => handlePrev()}
            className={prev}
          >
            Prev
          </button>
          <button
            disabled={disableNext || loadingNotifications}
            onClick={async () => handleNext()}
            className={next}
          >
            Next
          </button>
        </div>
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
              onClick={async () => await handleNotificationClick(not)}
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
