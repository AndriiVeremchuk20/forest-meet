import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      uid?: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

   interface User {
     uid?: string;
	   // ...other properties
     // role: UserRole;
   }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
  //  jwt: async ({ token, user }) => {
  //    console.log("User")
//	  console.log(user);
//	  token.uid = user.uid;
 //     return token;
  //  },

    session: async ({ session, user }) => { 
		session = {
			...session,
			user: {
				...user,
			}
		}
        return session; 
    },
  },

  //session: {
  //  strategy: "jwt",
  //},
  //jwt: {
    secret: env.NEXTAUTH_SECRET,
  //},

  adapter: PrismaAdapter(db),

  providers: [
    GoogleProvider({
      clientId: env.PROVIDER_GOOGLE_ID,
      clientSecret: env.PROVIDER_GOOGLE_SECRET,
      httpOptions: {
        timeout: 6000,
      },
    }),
  ],

  pages: {
    signIn: "/auth",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
