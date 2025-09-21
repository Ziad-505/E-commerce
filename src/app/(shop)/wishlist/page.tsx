"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, ArrowLeft, Trash2, Share2 } from "lucide-react";
import AddToCartBtn from "@/components/products/AddToCartBtn";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
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
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>
        </div>

        {wishlistItems && wishlistItems.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
              {wishlistItems.map((item) => (
                <div key={item._id} className="group bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                  {/* Remove Button */}
                  <div className="flex justify-end mb-2">
                    <Button
                      onClick={() => removeFromWishlist(item._id)}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Product Image */}
                  <div className="relative mb-4">
                    <Link href={`/products/${item._id}`}>
                      <div className="aspect-square relative bg-white rounded-lg overflow-hidden">
                        <Image
                          src={item.imageCover}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    {/* Brand */}
                    {item.brand && (
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        {item.brand.name}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="font-medium text-gray-900 line-clamp-2 leading-tight">
                      <Link href={`/products/${item._id}`} className="hover:text-red-600 transition-colors">
                        {item.title}
                      </Link>
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-red-600">
                        {item.price} EGP
                      </span>
                      {item.priceAfterDiscount && item.priceAfterDiscount < item.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {item.priceAfterDiscount} EGP
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <AddToCartBtn
                        productId={item._id}
                        className="flex-1 h-9 bg-red-600 hover:bg-red-700 text-white text-sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 w-9 p-0"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions Bar */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <Button variant="outline" asChild>
                  <Link href="/products">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    // Clear all wishlist items
                    wishlistItems.forEach(item => removeFromWishlist(item._id));
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Wishlist
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Wishlist */
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md">
                Save items to your wishlist to keep track of products you love. 
                Start browsing to add your favorites!
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