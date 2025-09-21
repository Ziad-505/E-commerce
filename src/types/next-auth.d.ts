import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    user?: any;
    token?: string; 
  }
  
  interface Session {
    user?: any;
    routeMisrToken?: string; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: any;
    routeMisrToken?: string; 
  }
}
