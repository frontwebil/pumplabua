// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      role: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    name?: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // больше не null
    name?: string;
    role: string;
  }
}
