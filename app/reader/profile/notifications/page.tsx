import NotificationsPage from '@/components/Profile/NotificationsPage'

export const metadata = {
  title: 'Notifications',
  description: 'Notifications page.',
  alternates: {
    canonical: '/reader/profile/notifications',
    languages: {
      en: '/en/reader/profile/notifications',
    },
  },
}

type Props = {}

export default function page({}: Props) {
  return <NotificationsPage />
}
