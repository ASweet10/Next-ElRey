import NextAuth, { getServerSession } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import * as mongoose from 'mongoose'
import { User } from '@/models/user'
import bcrypt from 'bcrypt'

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
          name: "Credentials",
          id: "credentials",
          credentials: {
            username: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const email = credentials?.email
            const password = credentials?.password

            mongoose.connect(process.env.MONGO_URL)
            const user = await User.findOne({ email })
            const passwordOk = user && bcrypt.compareSync(password, user.password)

            if (passwordOk) {
              return user
            }

            return null
          }
        })
  ],
}

// Verify user is admin; If not, blocks endpoint access & no data returned
export async function isAdmin() {
  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email

  if (!userEmail) {
    return false
  }
  const userInfo = await User.findOne({email: userEmail})
  if (!userInfo) {
    return false
  }

  return userInfo.admin
}

const handler = NextAuth( authOptions )

export { handler as GET, handler as POST }