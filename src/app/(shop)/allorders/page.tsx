"use client";

import React, { useEffect, useState } from "react";
import { getUserOrders } from "@/services/orders.services";
import { Package, Clock, CheckCircle, XCircle, Truck, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

interface IOrder {
  _id: string;
  user: string;
  cartItems: Array<{
    product: {
      _id: string;
      title: string;
      imageCover: string;
    };
    price: number;
    count: number;
  }>;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await getUserOrders();
        if (response.success) {
          setOrders(response.data || []);
        } else {
          setError(response.message || "Failed to fetch orders");
        }
      } catch (err) {
        setError("An error occurred while fetching orders");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const getOrderStatus = (order: IOrder) => {
    if (order.isDelivered) return { label: "Delivered", color: "bg-green-500", icon: CheckCircle };
    if (order.isPaid && order.paymentMethodType === "card") return { label: "Processing", color: "bg-blue-500", icon: Package };
    if (order.paymentMethodType === "cash") return { label: "Confirmed", color: "bg-yellow-500", icon: Clock };
    return { label: "Pending", color: "bg-gray-500", icon: Clock };
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading your orders...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          </div>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>

        {error ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Orders</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = getOrderStatus(order);
              const StatusIcon = status.icon;
              
              return (
                <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Order #</span>
                          <span className="font-medium text-gray-900">{order._id.slice(-8)}</span>
                        </div>
                        <Badge className={`${status.color} text-white`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          {order.paymentMethodType === "cash" ? "Cash on Delivery" : "Card Payment"}
                        </div>
                        <div className="font-semibold text-gray-900">
                          {order.totalOrderPrice} EGP
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.cartItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">
                              {item.product.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.count} × {item.price} EGP
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {item.count * item.price} EGP
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm">
                        <Package className="w-4 h-4 mr-2" />
                        Track Order
                      </Button>
                      {!order.isDelivered && (
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          Cancel Order
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No orders yet
              </h2>
              <p className="text-gray-600 mb-8 max-w-md">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Button className="bg-red-600 hover:bg-red-700" asChild>
                <Link href="/products">
                  Start Shopping
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}