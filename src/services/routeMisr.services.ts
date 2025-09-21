interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
  }
  
  interface CheckoutSessionResponse {
    success: boolean;
    checkoutUrl?: string;
    sessionId?: string;
    error?: string;
    message?: string;
  }
  
  export async function createRouteMisrCheckoutSession(
    cartId: string,
    shippingAddress: ShippingAddress,
    token: string
  ): Promise<CheckoutSessionResponse> {
    try {
      const response = await fetch('/api/route-misr/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartId,
          shippingAddress,
          token
        }),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return {
        success: false,
        error: 'Network error occurred'
      };
    }
  }