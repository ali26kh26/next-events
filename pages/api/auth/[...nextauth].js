import NextAuth from "next-auth";
import { verifyPassword } from "../../../helpers/auth";
import { connectToDataBase } from "../../../helpers/db-util";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { findUdserById } from "../../../helpers/user";
export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
    async session({ session, token }) {
      let user;
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token?.sub) {
        user = await findUdserById(token.sub);
        session.user.lastName = user.lastName;
        if (user?.profile_url) {
          session.user.image = user.profile_url;
        }
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        if (user) {
          token.sub = user._id;
        }
      }
      return token;
    },
  },

  providers: [
    CredentialsProvider({
      async authorize(credintials) {
        const client = await connectToDataBase();
        const existingUser = await client
          .db()
          .collection("next-users")
          .findOne({ email: credintials.email });
        if (!existingUser) {
          client.close();
          throw new Error("no user found");
        }
        const isVaild = await verifyPassword(
          credintials.password,
          existingUser.password
        );
        if (!isVaild) {
          client.close();
          throw new Error("password is incorrect");
        }
        client.close();
        return existingUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
