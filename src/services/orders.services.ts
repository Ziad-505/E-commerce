"use server";
import { getUserToken } from "@/lib/server-utilts";

export async function handlePayment(
  formState: any,
  formData: FormData
) {
  console.log("=== Starting Payment Process ===");
  
  // Extract form data
  const cartId = formData.get("cartId") as string;
  const details = formData.get("details") as string;
  const city = formData.get("city") as string;
  const phone = formData.get("phone") as string;
  
  console.log("Form data extracted:", {
    cartId,
    details,
    city,
    phone
  });

  if (!cartId || !details || !city || !phone) {
    console.log("Missing required fields");
    return {
      success: false,
      error: {},
      message: "All fields are required",
      callbackUrl: "",
    };
  }

  const phoneRegex = /^(010|011|012|015)\d{8}$/;
  if (!phoneRegex.test(phone)) {
    console.log("Invalid phone format:", phone);
    return {
      success: false,
      error: { phone: ["Please enter a valid Egyptian phone number"] },
      message: "Invalid phone number format",
      callbackUrl: "",
    };
  }

  try {
    const token = await getUserToken();
    console.log("Token retrieved:", token ? "Yes" : "No");
    
    if (!token) {
      return {
        success: false,
        error: {},
        message: "Authentication required. Please login.",
        callbackUrl: "/login",
      };
    }

    const requestBody = {
      shippingAddress: {
        details: details,
        phone: phone,
        city: city
      }
    };

    console.log("Request URL:", `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`);
    console.log("Request body:", JSON.stringify(requestBody, null, 2));
    console.log("Request headers:", {
      "Content-Type": "application/json",
      "token": token ? "***PRESENT***" : "MISSING"
    });

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(requestBody),
      }
    );

    console.log("Response status:", res.status);
    console.log("Response ok:", res.ok);

    const data = await res.json();
    console.log("Response data:", data);

    if (!res.ok) {
      console.log("API Error:", data);
      return {
        success: false,
        error: {},
        message: data.message || `API Error: ${res.status}`,
        callbackUrl: "/checkout",
      };
    }

    console.log("=== Order Created Successfully ===");
    return {
      success: true,
      error: {},
      message: "Order placed successfully! You'll pay on delivery.",
      callbackUrl: "/orders/success",
    };

  } catch (error) {
    console.error("=== Unexpected Error ===", error);
    return {
      success: false,
      error: {},
      message: "Network error. Please check your connection and try again.",
      callbackUrl: "/checkout",
    };
  }
}

export async function getUserOrders() {
  try {
    const token = await getUserToken();
    
    if (!token) {
      return {
        success: false,
        data: null,
        message: "Authentication required. Please login.",
      };
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/orders", {
      headers: {
        token: token,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        data: null,
        message: data.message || "Failed to fetch orders",
      };
    }

    return {
      success: true,
      data: data.data || [],
      message: "Orders fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      success: false,
      data: null,
      message: "Failed to fetch orders",
    };
  }
}