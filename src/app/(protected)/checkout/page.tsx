"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useActionState, useState } from "react";
import { handlePayment } from "@/services/orders.services";
import { useSession } from "next-auth/react";
import {
  ShoppingCart,
  MapPin,
  Phone,
  Building2,
  CreditCard,
  Lock,
  ArrowLeft,
  Banknote,
  Wallet,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { createRouteMisrCheckoutSession } from "@/services/routeMisr.services";

const initialState = {
  success: false,
  error: {},
  message: "",
  callbackUrl: "",
};

export default function CheckOutPage() {
  const { cartDetails, setCartDetails } = useCart();
  const [action, formAction, isPending] = useActionState(
    handlePayment,
    initialState
  );
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isProcessingCard, setIsProcessingCard] = useState(false);
  const { data: session } = useSession();

  React.useEffect(() => {
    if (action.message) {
      if (action.success) {
        toast.success(action.message, { position: "top-center" });
        setCartDetails(null);
        if (action.callbackUrl) {
          setTimeout(() => router.push(action.callbackUrl), 1500);
        }
      } else {
        toast.error(action.message, { position: "top-center" });
      }
    }
  }, [action, router, setCartDetails]);

  const total = cartDetails?.data?.totalCartPrice || 0;

  const getUserToken = (): string | null => {
    if (!session?.user) {
      console.log("No user session found");
      return null;
    }

    if (session.routeMisrToken) {
      console.log("Using Route Misr token from session");
      return session.routeMisrToken;
    }

    console.log("No Route Misr token found in session");
    return null;
  };

  const handleCardPayment = async (formData: FormData) => {
    setIsProcessingCard(true);

    try {
      if (!session?.user) {
        toast.error("Please log in to continue with card payment");
        router.push("/login");
        return;
      }

      const shippingAddress = {
        details: formData.get("details") as string,
        phone: formData.get("phone") as string,
        city: formData.get("city") as string,
      };

      const userToken = getUserToken();

      if (!userToken) {
        toast.error(
          "Authentication token not found. Please log out and log in again."
        );
        return;
      }

      console.log(
        "Using token for payment:",
        userToken.substring(0, 20) + "..."
      );

      const result = await createRouteMisrCheckoutSession(
        cartDetails?.cartId || "",
        shippingAddress,
        userToken
      );

      if (result.success && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        toast.error(result.error || "Failed to create payment session");
        console.error("Payment session error:", result);
      }
    } catch (error) {
      console.error("Card payment error:", error);
      toast.error("Failed to process card payment");
    } finally {
      setIsProcessingCard(false);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const selectedPaymentMethod = formData.get("paymentMethod") as string;

    if (selectedPaymentMethod === "card") {
      await handleCardPayment(formData);
    } else {
      formAction(formData);
    }
  };

  if (!session?.user) {
    return (
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto max-w-md text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Login Required
            </h1>
            <p className="text-gray-600 mb-6">
              Please log in to continue with checkout
            </p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <input
                type="hidden"
                name="cartId"
                value={cartDetails?.cartId || ""}
              />
              <input type="hidden" name="paymentMethod" value={paymentMethod} />

              <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  Shipping Information
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Please provide your delivery details
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Address Details
                </Label>
                <Input
                  name="details"
                  placeholder="Enter your full address (street, building, apartment)"
                  className="h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                  required
                />
                {action.error?.details && (
                  <p className="text-red-600 text-sm">
                    {action.error.details[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  City
                </Label>
                <Input
                  name="city"
                  placeholder="Enter your city"
                  className="h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                  required
                />
                {action.error?.city && (
                  <p className="text-red-600 text-sm">{action.error.city[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  name="phone"
                  placeholder="01012345678"
                  type="tel"
                  className="h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                  required
                />
                {action.error?.phone && (
                  <p className="text-red-600 text-sm">
                    {action.error.phone[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500">Format: 01012345678</p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                  <Wallet className="w-5 h-5 text-gray-600" />
                  Payment Method
                </h2>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="cash" id="cash" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Banknote className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <label
                          htmlFor="cash"
                          className="font-medium text-gray-900 cursor-pointer"
                        >
                          Cash on Delivery
                        </label>
                        <p className="text-sm text-gray-600">
                          Pay with cash when your order is delivered
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <label
                          htmlFor="card"
                          className="font-medium text-gray-900 cursor-pointer"
                        >
                          Credit/Debit Card
                        </label>
                        <p className="text-sm text-gray-600">
                          Pay securely with your card via Route Misr
                        </p>
                        <div className="flex gap-1 mt-2">
                          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            VISA
                          </div>
                          <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
                            MC
                          </div>
                          <div className="w-8 h-5 bg-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold">
                            AE
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Secure Checkout
                  </span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Your information is protected with industry-standard
                  encryption
                </p>
              </div>

              <Button
                type="submit"
                disabled={isPending || isProcessingCard}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
              >
                {isPending || isProcessingCard ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : paymentMethod === "cash" ? (
                  "Place Order"
                ) : (
                  "Continue to Payment"
                )}
              </Button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Order Summary
              </h2>
            </div>

            {cartDetails ? (
              <div className="space-y-4">
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cartDetails.data.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.product.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.count}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.price * item.count} EGP
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{total} EGP</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">Included</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-red-600">{total} EGP</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    {paymentMethod === "cash" ? (
                      <>
                        <Banknote className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">
                          Cash on Delivery
                        </span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">
                          Card Payment via Route Misr
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">
                    {paymentMethod === "cash"
                      ? "You will pay in cash when your order arrives"
                      : "You will be redirected to secure Route Misr payment gateway"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No items in cart</p>
                <Link
                  href="/products"
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
