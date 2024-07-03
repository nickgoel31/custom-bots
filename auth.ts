import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
 
const prisma = new PrismaClient()
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks:{
    // async session({session, token, user}) {
    //   session.user.id = user.id
    //   return {
    //     ...session,
    //     user: {
    //       ...session.user,
    //       id: user.id
    //     }
    //   }
    // }
  },
  ...authConfig,
})