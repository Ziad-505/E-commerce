"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import {
  removeFromCart,
  removeUserCart,
  updateQtyProductCart,
} from "@/services/cart.services";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  X,
  ShoppingCart,
  ArrowLeft,
  Tag,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Shield,
} from "lucide-react";

export default function CartPage() {
  const { cartDetails, setCartDetails } = useCart();

  async function removeCartItem() {
    const res = await removeUserCart();
    if (res?.message === "success") {
      toast.success("Cart cleared successfully");
      setCartDetails(null);
    } else {
      toast.error("Something went wrong");
    }
  }

  async function removeProductFromCart(productId: string) {
    const res = await removeFromCart(productId);
    if (res.success) {
      toast.success(res.message, { position: "top-center" });
      setCartDetails(res.data);
    } else {
      toast.error(res.message, { position: "top-center" });
    }
  }

  async function updateQuantityProductCart(productId: string, count: number) {
    if (count < 1) return;

    const res = await updateQtyProductCart(productId, count);
    if (res.success) {
      toast.success(res.message, { position: "top-center" });
      setCartDetails(res.data);
    } else {
      toast.error(res.message, { position: "top-center" });
    }
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
        </div>

        {cartDetails ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cart Items ({cartDetails.data.products.length} items)
                  </h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {cartDetails.data.products.map((product) => (
                    <div
                      key={product._id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <Image
                            src={product.product.imageCover}
                            alt={product.product.title}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          <Button
                            onClick={() =>
                              removeProductFromCart(product.product._id)
                            }
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {product.product.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Brand: {product.product.brand?.name || "N/A"}
                          </p>
                          <p className="text-lg font-semibold text-red-600">
                            {product.price} EGP
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                updateQuantityProductCart(
                                  product.product._id,
                                  product.count - 1
                                )
                              }
                              disabled={product.count <= 1}
                              className="h-10 w-10 p-0 hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {product.count}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                updateQuantityProductCart(
                                  product.product._id,
                                  product.count + 1
                                )
                              }
                              className="h-10 w-10 p-0 hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            {product.count * product.price} EGP
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <Button variant="outline" asChild>
                      <Link href="/products">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                      </Link>
                    </Button>
                    <Button
                      onClick={removeCartItem}
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Order Summary
                </h3>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Have a coupon?
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Enter coupon code" className="flex-1" />
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      {cartDetails.data.totalCartPrice} EGP
                    </span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-gray-600">Included</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-red-600">
                        {cartDetails.data.totalCartPrice} EGP
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full h-12 bg-red-600 hover:bg-red-700 mb-4"
                  asChild
                >
                  <Link href="/checkout">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Link>
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Secure checkout guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md">
                Looks like you haven&apos;t added any items to your cart yet. Start
                shopping to fill it up!
              </p>
              <Button className="bg-red-600 hover:bg-red-700" asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
