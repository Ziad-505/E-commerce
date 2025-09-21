import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { cartId, shippingAddress, token } = await request.json();

    // Make request to Route Misr API
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent('http://localhost:3000/checkout/success')}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token, // User's authentication token
        },
        body: JSON.stringify({
          shippingAddress
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create checkout session');
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: data.session?.url,
      sessionId: data.session?.id,
      message: 'Checkout session created successfully'
    });

  } catch (error) {
    console.error('Route Misr checkout error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create checkout session' 
      },
      { status: 500 }
    );
  }
}