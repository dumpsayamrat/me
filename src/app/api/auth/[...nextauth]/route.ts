import NextAuth, { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (
          credentials &&
          process.env.ADMIN_USERNAME &&
          process.env.ADMIN_USERNAME === credentials.username &&
          process.env.ADMIN_PASSWORD &&
          process.env.ADMIN_PASSWORD === credentials.password
        ) {
          const user: User = { id: '1', email: '', name: 'Admin User' }
          return user
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    updateAge: 24 * 60 * 60 * 60 * 70,
  },
})

export { handler as GET, handler as POST }
