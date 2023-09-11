import ProfileUpdate from '@/components/Profile/ProfileUpdate'

export const metadata = {
  title: 'Profile',
  description: 'Profile updation page.',
}

type Props = {}

export default function page({}: Props) {
  return <ProfileUpdate />
}
