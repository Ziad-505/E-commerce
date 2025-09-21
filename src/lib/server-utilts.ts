"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const encodedToken = cookieStore.get("next-auth.session-token")?.value;
    
    if (!encodedToken) {
      console.log("No session token found");
      return null;
    }

    
    const secret = process.env.NEXTAUTH_SECRET?.replace(/['"]/g, '') || '';
    
    if (!secret) {
      console.error("NEXTAUTH_SECRET is not set");
      return null;
    }

    const decodedToken = await decode({
      token: encodedToken,
      secret: secret,
    });

    if (!decodedToken?.routeMisrToken) {
      console.log("No Route Misr token found in decoded session");
      return null;
    }
    return decodedToken.routeMisrToken as string;
    
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}