"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    
    const allCookies = cookieStore.getAll();
    console.log("=== TOKEN DEBUG ===");
    console.log("Available cookies:", allCookies.map(c => c.name));
    console.log("Environment:", process.env.NODE_ENV);
    
    let encodedToken: string | undefined;
    
    encodedToken = cookieStore.get("next-auth.session-token")?.value;
    
    if (!encodedToken) {
      encodedToken = cookieStore.get("__Secure-next-auth.session-token")?.value;
    }
    
    if (!encodedToken) {
      const vercelCookie = allCookies.find(cookie => 
        cookie.name.includes('vercel') && 
        (cookie.name.includes('session-token') || cookie.name.includes('wt'))
      );
      if (vercelCookie) {
        encodedToken = vercelCookie.value;
        console.log("Found Vercel cookie:", vercelCookie.name);
      }
    }
    
    if (!encodedToken) {
      const jwtCookie = allCookies.find(cookie => 
        cookie.value.includes('.') && 
        cookie.value.length > 100 
      );
      if (jwtCookie) {
        encodedToken = jwtCookie.value;
        console.log("Found potential JWT cookie:", jwtCookie.name);
      }
    }
    
    console.log("Session token found:", !!encodedToken);
    console.log("Token length:", encodedToken?.length || 0);
    
    if (!encodedToken) {
      console.log("❌ No session token found in any cookie");
      return null;
    }

    const secret = process.env.NEXTAUTH_SECRET?.replace(/['"]/g, '') || '';
    
    if (!secret) {
      console.error("❌ NEXTAUTH_SECRET is not set");
      return null;
    }

    const decodedToken = await decode({
      token: encodedToken,
      secret: secret,
    });

    console.log("Token decoded successfully:", !!decodedToken);
    console.log("Available properties in decoded token:", Object.keys(decodedToken || {}));

    if (!decodedToken?.routeMisrToken) {
      console.log("❌ No Route Misr token found in decoded session");
      console.log("Full decoded token:", JSON.stringify(decodedToken, null, 2));
      return null;
    }

    console.log("✅ Route Misr token found successfully");
    return decodedToken.routeMisrToken as string;
    
  } catch (error) {
    console.error("❌ Error in getUserToken:", error);
    return null;
  }
}