import ProfileUpdate from '@/components/Profile/ProfileUpdate'

export const metadata = {
  title: 'Profile',
  description: 'Profile updation page.',
  alternates: {
    canonical: '/reader/profile',
    languages: {
      en: '/en/reader/profile',
    },
  },
}

type Props = {}

export default function page({}: Props) {
  return <ProfileUpdate />
}
