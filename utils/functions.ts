import { sendNotification } from '@/services'

export function timeAgo(createdAt: string) {
  const date = new Date(createdAt)
  const now = new Date()

  const updatedTime = date.getTime()
  const currTime = now.getTime()

  const diffInHrs = (currTime - updatedTime) / (1000 * 60 * 60)

  // in minutes
  if (diffInHrs < 1) return `${Math.round(diffInHrs * 60)} min`
  // in hours
  else if (diffInHrs < 24) return `${Math.round(diffInHrs)} hrs`
  // in days
  else if (diffInHrs > 24 && diffInHrs < 24 * 30)
    return `${Math.round(diffInHrs / 24)} days`
  // in months
  else if (diffInHrs > 24 * 30 && diffInHrs < 24 * 30 * 12)
    return `${Math.round(diffInHrs / (24 * 30))} months`
  // in years
  else return `${Math.round(diffInHrs / (24 * 30 * 12))} years`
}

export function handleMouseFeedback() {
  let mouseMark = document.querySelector('.mousemark') as HTMLDivElement
  if (!mouseMark) {
    mouseMark = document.createElement('div')
    mouseMark.classList.add('mousemark')
    document.body.appendChild(mouseMark)
  }

  document.body.addEventListener('click', (e: MouseEvent) => {
    mouseMark.style.setProperty('--left', e.pageX + 'px')
    mouseMark.style.setProperty('--top', e.pageY + 'px')

    if (mouseMark.classList.contains('click')) return
    mouseMark.classList.add('click')
    setTimeout(() => mouseMark.classList.remove('click'), 250)
  })
}

export async function sendCommentNotification(
  actor: string,
  actorId: string,
  notifierId: string,
  postTitle: string,
  postSlug: string
  // commentId: string
) {
  const entity = `${actor} commented on your post "${postTitle}"`
  await sendNotification(
    'commented',
    'comment',
    '',
    postSlug,
    entity,
    actorId,
    notifierId
  )
}

export async function sendReplyNotification(
  actor: string,
  actorId: string,
  notifierId: string,
  postTitle: string,
  postSlug: string
  // commentId: string
) {
  const entity = `${actor} replied on your comment on "${postTitle}"`
  await sendNotification(
    'replied',
    'reply',
    '',
    postSlug,
    entity,
    actorId,
    notifierId
  )
}
