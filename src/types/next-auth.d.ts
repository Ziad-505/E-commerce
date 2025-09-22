import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    user?: Record<string, unknown>;
    token?: string;
  }
  
  interface Session {
    user?: Record<string, unknown>;
    routeMisrToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: Record<string, unknown>;
    routeMisrToken?: string;
  }
}