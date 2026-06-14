import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { comparePassword } from "@/lib/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        await connectDB();

        const email = String(credentials?.email || "").toLowerCase();
        const password = String(credentials?.password || "");

        const user = await User.findOne({ email }).select("+password");

        if (!user || !user.password) {
          return null;
        }

        const isValid = await comparePassword(password, user.password);

        if (!isValid) {
          return null;
        }

        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.avatar,
        };
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
    if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = token.role;
    }

    return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});