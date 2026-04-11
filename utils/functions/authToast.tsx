import { toast } from 'react-toastify'
import Link from 'next/link'

interface AuthRedirectState {
  pendingComment?: string
  scrollToSection?: string // element id to scroll to after redirect
}

export function saveAuthRedirectState(state: AuthRedirectState) {
  try {
    if (state.pendingComment) localStorage.setItem('pendingComment', state.pendingComment)
    if (state.scrollToSection) localStorage.setItem('scrollToSection', state.scrollToSection)
  } catch {}
}

export function restoreAuthRedirectState(): AuthRedirectState {
  try {
    const pendingComment = localStorage.getItem('pendingComment') ?? undefined
    const scrollToSection = localStorage.getItem('scrollToSection') ?? undefined
    return { pendingComment, scrollToSection }
  } catch {
    return {}
  }
}

export function clearAuthRedirectState() {
  try {
    localStorage.removeItem('pendingComment')
    localStorage.removeItem('scrollToSection')
  } catch {}
}

export function showAuthToast(callbackUrl?: string, state?: AuthRedirectState) {
  if (state) saveAuthRedirectState(state)

  const signinUrl = callbackUrl
    ? `/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : '/auth/signin'

  toast.warn(
    <span>
      Please{' '}
      <Link
        href={signinUrl}
        style={{ color: 'var(--color-primary-blue)', fontWeight: 600, textDecoration: 'underline' }}
        onClick={() => toast.dismiss()}
      >
        sign in
      </Link>{' '}
      to continue.
    </span>,
    {
      toastId: 'auth-required',
      autoClose: 5000,
    }
  )
}
