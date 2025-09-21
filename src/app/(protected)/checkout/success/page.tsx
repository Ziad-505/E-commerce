'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
  const { setCartDetails } = useCart();

  useEffect(() => {
    setCartDetails(null);
  }, [setCartDetails]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-sm">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        <Button asChild className="bg-red-600 hover:bg-red-700">
          <Link href="/products">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
}