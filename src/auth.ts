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
        console.log(credentials);

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
          if (!res.ok) {
            throw new Error(data.message || "Failed  to fetch");
          }
          const decoded = JSON.parse(atob(data.token.split(".")[1]));
          return {
            id: decoded.id,
            user: data.user,
            token: data.token, 
          };
        } catch (error) {
          console.log(error);
          throw new Error((error as Error).message);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.routeMisrToken = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.routeMisrToken = token.routeMisrToken; 
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
};