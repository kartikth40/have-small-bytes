import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
            // authorization: `Bearer ${process.env.HYGRAPH_PERMANENTAUTH_TOKEN}`,
          },
        })
        const user = await res.json()

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
    // GithubProvider({
    //   clientId:
    //     process.env.APP_ENV === 'development'
    //       ? process.env.GITHUB_TEST_ID!
    //       : process.env.GITHUB_ID!,
    //   clientSecret:
    //     process.env.APP_ENV === 'development'
    //       ? process.env.GITHUB_TEST_SECRET!
    //       : process.env.GITHUB_SECRET!,
    // }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: any
      user: any
      trigger?: any
      session?: any
    }) {
      // if updating the session
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }
      // for OAuth tokens
      if (user && !user.photo && user.image) {
        user = { ...user, photo: { id: user.id, url: user.image } }
        delete user.image
        delete token.picture
      }

      return { ...token, ...user }
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user = token
      return session
    },
  },
  // pages: {
  //   signIn: '/auth/signin',
  // },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
