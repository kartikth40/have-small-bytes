import ResetPassword from '@/components/Profile/ResetPassword'

export const metadata = {
  title: 'Reset Password',
  description: 'Reset Password page.',
}

type Props = {}

export default function page({}: Props) {
  return <ResetPassword />
}
