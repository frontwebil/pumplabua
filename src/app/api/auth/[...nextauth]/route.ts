import prisma from "@/lib/prisma";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      id: "user-login",
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

        return {
          id: user.id,
          name: user.name,
          role: "user",
          favoritesProducts: user.favoriteProducts,
          email: user.email,
        };
      },
    }),
    Credentials({
      id: "admin-login",
      name: "Admin login",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials?.login || !credentials?.password) {
          return null;
        }

        const admin = await prisma.admin.findUnique({
          where: {
            login: credentials.login,
          },
        });

        if (!admin) {
          return null;
        }

        const isValidAdmin = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!isValidAdmin) {
          return null;
        }
        return {
          id: admin.id,
          role: "admin",
        };
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
        token.role = user.role;

        if (user.role === "user") {
          token.name = user.name;
          token.email = user.email; // ← тепер НЕ undefined
          token.favoritesProducts = user.favoritesProducts;
        }
      }
      return token;
    },

    // 🔹 Session для фронтенда
    async session({ session, token }) {
      if (token?.id) {
        session.user = {
          id: token.id as string,
          role: token.role as string,
        };

        // 👇 Только для обычных юзеров
        if (token.role === "user") {
          session.user.name = token.name as string;
          session.user.email = token.email as string;
          session.user.favoritesProducts = token.favoritesProducts as string[];
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
