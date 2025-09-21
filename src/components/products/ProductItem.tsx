import React from "react";
import Image from "next/image";
import { Star, Eye } from "lucide-react";
import { IProduct } from "@/interface/products.interface";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import WishlistButton from "./WishlistButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductItem({ product }: { product: IProduct }) {
  const hasDiscount = product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.priceAfterDiscount!) / product.price) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50">
        {/* Discount Badge */}
        {hasDiscount && (
          <Badge 
            variant="destructive" 
            className="absolute top-3 left-3 z-10 text-xs px-2 py-1"
          >
            -{discountPercentage}%
          </Badge>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <WishlistButton
            product={product}
            className="w-8 h-8 bg-white/90 hover:bg-white shadow-md"
          />
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 bg-white/90 hover:bg-white shadow-md"
            asChild
          >
            <Link href={`/products/${product._id}`}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Product Image */}
        <Link href={`/products/${product._id}`} className="block">
          <div className="aspect-square relative">
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </Link>

        {/* Add to Cart Button - Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <AddToCartBtn
            productId={product._id}
            className="w-full bg-white text-gray-900 hover:bg-gray-100 font-medium"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        {product.brand && (
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            {product.brand.name}
          </div>
        )}

        {/* Product Title */}
        <h3 className="font-medium text-gray-900 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
          <Link href={`/products/${product._id}`}>
            {product.title}
          </Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.ratingsAverage)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">
            ({product.ratingsQuantity})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-red-600">
            {hasDiscount ? product.priceAfterDiscount : product.price} EGP
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {product.price} EGP
            </span>
          )}
        </div>
      </div>
    </div>
  );
}