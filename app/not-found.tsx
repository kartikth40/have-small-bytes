import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <p>
          View{' '}
          <Link
            style={{ color: 'var(--color-primary-blue)', fontWeight: '900' }}
            href="/"
          >
            all posts
          </Link>
        </p>
      </div>
    </div>
  )
}
