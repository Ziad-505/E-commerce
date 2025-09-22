"use server";

type CartResponse = {
  data: Record<string, unknown> | boolean;
  success: boolean;
  message: string;
};

export async function getUserCart(token: string): Promise<CartResponse> {
  try {
    if (!token) {
      return {
        data: false,
        success: false,
        message: "Authentication required. Please login.",
      };
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: {
        token: token,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        data: false,
        success: false,
        message: data.message || "Error in Fetching Cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Fetched Cart Successfully",
    };
  } catch (error) {
    console.error("Error in getUserCart:", error);
    return {
      data: false,
      success: false,
      message: "Unexpected Error in Fetching Cart",
    };
  }
}

export async function removeUserCart(token: string): Promise<CartResponse> {
  try {
    if (!token) {
      return {
        data: false,
        success: false,
        message: "Authentication required. Please login.",
      };
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "DELETE",
      headers: {
        token: token,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        data: false,
        success: false,
        message: data.message || "Error in Removing Cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Removed Cart Successfully",
    };
  } catch (error) {
    console.error("Error in removeUserCart:", error);
    return {
      data: false,
      success: false,
      message: "Unexpected Error in Removing Cart",
    };
  }
}

export async function addToCart(productId: string, token: string): Promise<CartResponse> {
  try {
    if (!productId) {
      return {
        data: false,
        success: false,
        message: "Product ID is required",
      };
    }

    if (!token) {
      return {
        data: false,
        success: false,
        message: "Authentication required. Please login.",
      };
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: token,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        data: false,
        success: false,
        message: data.message || "Error in Adding Item to Cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Item Added to Cart Successfully",
    };
  } catch (error) {
    console.error("Error in addToCart:", error);
    return {
      data: false,
      success: false,
      message: "Unexpected Error in Adding Item To Cart",
    };
  }
}

export async function removeFromCart(productId: string, token: string): Promise<CartResponse> {
  try {
    if (!productId) {
      return {
        data: false,
        success: false,
        message: "Product ID is required",
      };
    }

    if (!token) {
      return {
        data: false,
        success: false,
        message: "Authentication required. Please login.",
      };
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        token: token,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        data: false,
        success: false,
        message: data.message || "Error in Removing Item from Cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Item Removed from Cart Successfully",
    };
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    return {
      data: false,
      success: false,
      message: "Unexpected Error in Removing Item From Cart",
    };
  }
}

export async function updateQtyProductCart(productId: string, count: number, token: string): Promise<CartResponse> {
  try {
    if (!productId) {
      return {
        data: false,
        success: false,
        message: "Product ID is required",
      };
    }

    if (!token) {
      return {
        data: false,
        success: false,
        message: "Authentication required. Please login.",
      };
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        token: token,
      },
      body: JSON.stringify({ count }),
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        data: false,
        success: false,
        message: data.message || "Error in Updating Quantity in Cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Updated Quantity in Cart Successfully",
    };
  } catch (error) {
    console.error("Error in updateQtyProductCart:", error);
    return {
      data: false,
      success: false,
      message: "Unexpected Error in Updating Item To Cart",
    };
  }
}
