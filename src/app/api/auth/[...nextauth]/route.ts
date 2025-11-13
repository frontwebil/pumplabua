import prisma from "@/lib/prisma";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "User login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        });

        if (!user) {
          return null;
        }

        const isValidUser = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidUser) {
          return null;
        }

        return { id: user.id, name: user.name, role: "user" };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    // 🔹 JWT токен
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name!;
        token.role = user.role;
      }
      return token;
    },

    // 🔹 Session для фронтенду
    async session({ session, token }) {
      if (token?.id) {
        session.user = {
          id: token.id,
          name: token.name,
          role: token.role as string,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
