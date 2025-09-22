// "use server";

// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export async function getUserToken(): Promise<string | null> {
//   try {
//     const cookieStore = await cookies();
//     const encodedToken = cookieStore.get("next-auth.session-token")?.value;
    
//     if (!encodedToken) {
//       console.log("No session token found");
//       return null;
//     }

    
//     const secret = process.env.NEXTAUTH_SECRET?.replace(/['"]/g, '') || '';
    
//     if (!secret) {
//       console.error("NEXTAUTH_SECRET is not set");
//       return null;
//     }

//     const decodedToken = await decode({
//       token: encodedToken,
//       secret: secret,
//     });

//     if (!decodedToken?.routeMisrToken) {
//       console.log("No Route Misr token found in decoded session");
//       return null;
//     }
//     return decodedToken.routeMisrToken as string;
    
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return null;
//   }
// }



"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    
    // Debug: Check what cookies exist
    const allCookies = cookieStore.getAll();
    console.log("=== TOKEN DEBUG ===");
    console.log("Available cookies:", allCookies.map(c => c.name));
    console.log("Environment:", process.env.NODE_ENV);
    
    // Try different possible cookie names (production uses secure cookies)
    let encodedToken = cookieStore.get("next-auth.session-token")?.value;
    
    if (!encodedToken) {
      // Try secure cookie name (used in production HTTPS)
      encodedToken = cookieStore.get("__Secure-next-auth.session-token")?.value;
    }
    
    if (!encodedToken) {
      // Try other possible variations
      encodedToken = cookieStore.get("next-auth.session-token.0")?.value;
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

    console.log("Secret available:", !!secret);
    console.log("Secret length:", secret.length);

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
    console.log("Token starts with:", (decodedToken.routeMisrToken as string).substring(0, 20));
    return decodedToken.routeMisrToken as string;
    
  } catch (error) {
    console.error("❌ Error in getUserToken:", error);
    return null;
  }
}