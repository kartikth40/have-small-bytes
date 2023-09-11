import ResetPassword from '@/components/Profile/ResetPassword'

export const metadata = {
  title: 'Reset Password',
  description: 'Reset Password page.',
  alternates: {
    canonical: '/reader/profile/reset-password',
    languages: {
      en: '/en/reader/profile/reset-password',
    },
  },
}

type Props = {}

export default function page({}: Props) {
  return <ResetPassword />
}
