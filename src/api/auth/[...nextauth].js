// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  database: process.env.DATABASE_URL,
}

export default (req, res) => NextAuth(req, res, options)
