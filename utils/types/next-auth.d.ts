import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      photo?: {
        id: string
        url: string
      }
      accessToken: string
      isAuthor: boolean
    }
  }
}
