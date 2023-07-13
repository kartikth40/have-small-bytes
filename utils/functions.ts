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
