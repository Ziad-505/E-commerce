import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { name: "email", type: "email", required: true },
        password: { name: "password", type: "password", required: true },
      },
      authorize: async (credentials) => {
        console.log("=== LOGIN ATTEMPT ===", credentials?.email);

        try {
          const res = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const data = await res.json();
          console.log("Login API response:", data.message);
          
          if (!res.ok) {
            throw new Error(data.message || "Failed to fetch");
          }
          const decoded = JSON.parse(atob(data.token.split(".")[1]));
          
          console.log("User authorized successfully:", decoded.id);
          
          return {
            id: decoded.id,
            user: data.user,
            token: data.token, 
          };
        } catch (error) {
          console.log("Authorization error:", error);
          throw new Error((error as Error).message);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("Storing user in JWT:", !!user.token);
        token.user = user.user;
        token.routeMisrToken = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        console.log("Creating session with token:", !!token.routeMisrToken);
        session.user = token.user;
        session.routeMisrToken = token.routeMisrToken; 
      }
      return session;
    }
  },
  
  // Add these production settings
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.session-token' 
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  
  pages: {
    signIn: "/login",
  },
};